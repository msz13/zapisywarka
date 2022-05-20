import { CatalogQuery } from '../catalog.query';
import { CatalogStore } from '../catalog.store';
import { discardPeriodicTasks, fakeAsync, tick } from '@angular/core/testing';
import { of, Observable } from 'rxjs';
import {
  CATALOG_ITEMS,
  CATEGORIES_RAW,
  FILTERED_BY_CATEGORY,
  GOUPED_BY_CATEGORY,
} from './fixtures/test-fixtures';
import {
  CatalogCategory,
  CatalogCategoryQuery,
} from '@zapisywarka-web/web-catalog-category-domain';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';
import { CatalogItem } from '../catalog.model';

describe('Catalog query', () => {
  let spectator: SpectatorService<CatalogQuery>;
  const createService = createServiceFactory({
    service: CatalogQuery,
    mocks: [CatalogCategoryQuery],
  });
  let store: CatalogStore;
  let query: CatalogQuery;

  beforeEach(() => {
    spectator = createService();
    query = spectator.service;
    const store = spectator.inject(CatalogStore);
    store.set(CATALOG_ITEMS);
  });

  describe('Catalog filter', () => {
    it.skip('should select filter after updating store', fakeAsync(() => {
      const expectedFilter = {
        category: 1,
      };
      store.update({
        ui: {
          filter: expectedFilter,
        },
      });

      let filter: { category: number | null };

      expect(filter).toBeDefined();
      expect(filter).toBe(expectedFilter);
    }));

    it('should select all items with no categories filter', fakeAsync(() => {
      tick();
      query.selectFiltered().subscribe((items) => {
        expect(items).toHaveLength(4);
        expect(items).toEqual(CATALOG_ITEMS);
      });
    }));

    it.skip('should select items filterd by category', fakeAsync(() => {
      const filter = {
        category: 1,
      };

      let filteredItems;
      query.selectFiltered().subscribe((items) => (filteredItems = items));

      tick(100);

      expect(filteredItems).toHaveLength(2);
      expect(filteredItems).toEqual(FILTERED_BY_CATEGORY);
    }));

    it.skip('should select all items with filter set to null', () => {
      const filter = {
        category: 1,
      };
      store.update({
        ui: {
          filter: filter,
        },
      });

      store.update({
        ui: {
          filter: { category: null },
        },
      });

      let filteredItems;

      query.selectFiltered().subscribe((items) => (filteredItems = items));

      expect(filteredItems).toHaveLength(4);
      expect(filteredItems).toEqual(CATALOG_ITEMS);
    });

    it.skip('should select items with category after selected filter', fakeAsync(() => {
      const filter = {
        category: 2,
      };

      store.update({
        ui: {
          filter: filter,
        },
      });

      let filteredItems;
      query.selectCatalogItems().subscribe((item) => (filteredItems = item));
      tick(100);
      expect(filteredItems).toHaveLength(2);
      expect(filteredItems.map((item) => item.category)).toEqual([
        'Foremkowy',
        'Foremkowy',
      ]);
    }));
  });

  describe('getGroupedByCategory', () => {
    it('should return items grouped by cateogry', fakeAsync(() => {
      const categoriesQuery = spectator.inject(CatalogCategoryQuery);
      categoriesQuery.getAll.mockReturnValue(
        CATEGORIES_RAW as unknown as CatalogItem[]
      );

      let transformedItem;
      query.selectGroupedByCategory().subscribe((items) => {
        transformedItem = items;
      });
      tick();
      expect(transformedItem).toMatchObject(GOUPED_BY_CATEGORY);
    }));
  });
});

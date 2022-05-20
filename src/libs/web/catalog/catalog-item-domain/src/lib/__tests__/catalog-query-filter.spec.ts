import { CatalogFilter } from '../catalog.filter';
import {
  CATALOG_ITEMS,
  FILTERED_BY_CATEGORY,
  FILTERED_BY_NAME,
  FILTERED_BY_NAME_AND_CATEGORY,
} from './fixtures/test-fixtures';

describe.only('Catalog Filter', () => {
  it('with empty filter should return all items', () => {
    const filter = CatalogFilter.fromFilterData({});

    const filterd = CATALOG_ITEMS.filter(filter);

    expect(filterd).toEqual(CATALOG_ITEMS);
  });

  it('should return items filtered by categoryId', () => {
    const filter = CatalogFilter.fromFilterData({ category: 1 });

    const filterd = CATALOG_ITEMS.filter(filter);

    expect(filterd).toEqual(FILTERED_BY_CATEGORY);
  });

  it('should return items filtered by name', () => {
    const filter = CatalogFilter.fromFilterData({ name: 'tra' });

    const filterd = CATALOG_ITEMS.filter(filter);

    expect(filterd).toEqual(FILTERED_BY_NAME);
  });

  it('should return items filtered by name and category', () => {
    const filter = CatalogFilter.fromFilterData({ category: 1, name: 'tra' });

    const filtered = CATALOG_ITEMS.filter(filter);

    expect(filtered.length).toBe(1);
    expect(filtered).toEqual(FILTERED_BY_NAME_AND_CATEGORY);
  });
});

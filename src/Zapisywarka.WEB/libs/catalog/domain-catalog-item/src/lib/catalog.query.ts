import { Injectable } from '@angular/core';
import {
  QueryEntity,
  combineQueries,
  QueryConfig,
  Order,
} from '@datorama/akita';
import { CatalogStore, CatalogState } from './catalog.store';
import { CatalogCategoryQuery } from '@zapisywarka-client-aps/catalog/domain-category';
import { CatalogItem, CatalogItemsGroupedByCategoryVM } from './catalog.model';
import { map } from 'rxjs/operators';
import { Observable, combineLatest } from 'rxjs';
import { CatalogFilter } from './catalog.filter';

@Injectable({ providedIn: 'root' })
@QueryConfig({
  sortBy: 'id',
  sortByOrder: Order.DESC,
})
export class CatalogQuery extends QueryEntity<CatalogState> {
  constructor(
    protected store: CatalogStore,
    private categoriesQuery: CatalogCategoryQuery
  ) {
    super(store);
  }

  selectCatalogItems(): Observable<
    {
      category: string;
      id: number;
      name: string;
      categoryId: number;
      price: number;
      avaibleQuantity: number;
    }[]
  > {
    return combineQueries([
      this.selectFiltered(),
      this.categoriesQuery.selectAll({ asObject: true }),
    ]).pipe(
      map(([catalogItems, categories]) => {
        return catalogItems.map((catalogItem) => {
          return {
            ...catalogItem,
            category: categories[catalogItem.categoryId]
              ? categories[catalogItem.categoryId].name
              : 'Bez kategorii',
          };
        });
      })
    );
  }

  selectFiltered(): Observable<CatalogItem[]> {
    /*
    return this.select(state => state.ui).pipe(
      tap(filter => console.log(JSON.stringify(filter))),
      switchMap( ui => {
        if (!ui.filter) {
          return this.selectAll()
        } 
        else {
           return this.selectAll({filterBy: item => this.categoryFilterFn(item, ui.filter) })
        }
      })
    )
    */

    return combineLatest([
      this.select((state) => state.ui.filter),
      this.selectAll(),
    ]).pipe(
      map(([filter, catalogItems]) => {
        const currentFilter = CatalogFilter.fromFilterData(filter);

        return catalogItems.filter(currentFilter);
      })
    );
  }

  selectGroupedByCategory(): Observable<CatalogItemsGroupedByCategoryVM> {
    return this.selectAll().pipe(
      map((items) => {
        const categories = this.categoriesQuery.getAll({ asObject: true });

        return items.reduce((grouped, item) => {
          const category = categories[item.categoryId].name;

          grouped[category] = grouped[category] || [];

          grouped[category].push(item);

          return grouped;
        }, {} as CatalogItemsGroupedByCategoryVM);
      })
    );
  }
}

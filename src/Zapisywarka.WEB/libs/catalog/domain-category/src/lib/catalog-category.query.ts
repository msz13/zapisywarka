import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { CatalogCategoryStore, CatalogCategoryState } from './catalog-category.store';

@Injectable({ providedIn: 'root' })
export class CatalogCategoryQuery extends QueryEntity<CatalogCategoryState> {

  constructor(protected store: CatalogCategoryStore) {
    super(store);
  }

}

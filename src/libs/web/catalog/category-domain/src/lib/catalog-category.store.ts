import { CatalogCategory } from './catalog-category.model';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CatalogCategoryState extends EntityState<CatalogCategory> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'catalogCategories' })
export class CatalogCategoryStore extends EntityStore<CatalogCategoryState> {
  constructor() {
    super();
  }
}

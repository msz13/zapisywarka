import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { CatalogItem } from './catalog.model';
import { Id } from '@zapisywarka-web/web-catalog-category-domain';
import { CatalogFilter } from './catalog.filter';

export interface CatalogState extends EntityState<CatalogItem> {
  ui: {
    filter: CatalogFilter;
  };
}

const initialState = {
  ui: {
    filter: {
      category: undefined,
      name: '',
    },
  },
};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'catalog' })
export class CatalogStore extends EntityStore<CatalogState> {
  constructor() {
    super(initialState);
  }
}

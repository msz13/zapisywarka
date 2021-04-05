import { CatalogCategory } from './catalog-category.model';
import {EntityState, EntityStore, StoreConfig} from '@datorama/akita'
import { Injectable } from '@angular/core';

export interface CatalogCategoryState extends EntityState<CatalogCategory> {}

@Injectable({providedIn: 'root'})
@StoreConfig({name: 'catalogCategories'})
export class CatalogCategoryStore extends EntityStore<CatalogCategoryState> {
    constructor() {
        super()
    }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { tap, mapTo, map } from 'rxjs/operators';
import { CatalogCategory } from './catalog-category.model';
import { CatalogCategoryStore } from './catalog-category.store';
import { timer, of } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class CatalogCategoryService {

  url = 'api/catalog-categories'

  constructor(private catalogCategoryStore: CatalogCategoryStore, private http: HttpClient) {
  }


 /* get() {
    return this.http.get<CatalogCategory[]>('https://api.com').pipe(tap(entities => {
      this.catalogCategoryStore.set(entities);
    }));
  } */

  get() {
   /* return timer(500).pipe(
      mapTo(CATALOG_CATEGORIES),
      tap(response => this.catalogCategoryStore.set(response)),
      map(()=> true)
      ) */
      return of(true)
  }

  add(catalogCategoryName: string) {
   
    this.http.post(this.url, {name: catalogCategoryName}).pipe(
      tap(category => {
        this.catalogCategoryStore.add(category as CatalogCategory)
      })      
    ).subscribe(_=> {})
    
  }

  update(id, catalogCategory: Partial<CatalogCategory>) {
    this.http.put(`${this.url}/${id}`,catalogCategory).pipe(
      tap(()=> {
        this.catalogCategoryStore.update(id, catalogCategory)})
    ).subscribe(_=> {})
    
  }

  remove(id: ID) {    
    this.catalogCategoryStore.remove(id);
  }

}

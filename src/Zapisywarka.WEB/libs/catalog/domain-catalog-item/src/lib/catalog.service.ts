import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ID, withTransaction } from '@datorama/akita';
import { tap, mapTo, map, catchError } from 'rxjs/operators';
import { CatalogItem, NewCatalogItem } from './catalog.model';
import { CatalogStore } from './catalog.store';
import { of, Observable } from 'rxjs';
import { CatalogFilter } from './catalog.filter';

@Injectable({ providedIn: 'root' })
export class CatalogService {
  private path = '/catalog-items';

  private url = '/api/catalog-items';

  constructor(private catalogStore: CatalogStore, private http: HttpClient) {}

  /*timer(500).pipe(
      mapTo({catalogItems: CATALOG_ITEMS,
        catalogCategories: CATALOG_CATEGORIES
      }), 
      */

  get() {
    this.catalogStore.setLoading(true);
    return this.http.get<CatalogItem[]>(this.url).pipe(
      withTransaction((response) => {
        this.catalogStore.set(response);
      }),
      tap(() => this.catalogStore.setLoading(false)),
      map(() => true)
    );
  }

  add(catalog: NewCatalogItem): Observable<boolean> {
    this.catalogStore.setLoading(true);
    return this.http.post(this.url, catalog).pipe(
      tap((response) => {
        this.catalogStore.add(response as CatalogItem);
      }),
      mapTo(true),
      tap(() => this.catalogStore.setLoading(false)),
      catchError((err) => {
        console.log(JSON.stringify(err));
        return of(false);
      })
    );
  }

  update(id, catalog: CatalogItem) {
    this.catalogStore.setLoading(true);
    return this.http.put(`${this.url}/${id}`, catalog).pipe(
      tap((response) => {
        this.catalogStore.update(id, catalog);
        this.catalogStore.setLoading(false);
      }),
      mapTo(true)
    );
  }

  remove(id: ID) {
    return this.http
      .delete(`${this.url}/${id}`)
      .pipe(tap(() => this.catalogStore.remove(id)));
  }

  updateFilter(filter: CatalogFilter) { throw new Error("Not implementes") }
}

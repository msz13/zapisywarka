import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { tap } from 'rxjs/operators';
import { Offer } from './offer.model';
import { OffersStore } from './offers.store';

@Injectable({ providedIn: 'root' })
export class OffersService {

  constructor(private offersStore: OffersStore, private http: HttpClient) {
  }


  get() {
    return this.http.get<Offer[]>('https://api.com').pipe(tap(entities => {
      this.offersStore.set(entities);
    }));
  }

  add(offer: Offer) {
    this.offersStore.add(offer);
  }

  update(id, offer: Partial<Offer>) {
    this.offersStore.update(id, offer);
  }

  remove(id: ID) {
    this.offersStore.remove(id);
  }

}

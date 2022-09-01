import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { OffersStore, OffersState } from './offers.store';

@Injectable({ providedIn: 'root' })
export class OffersQuery extends QueryEntity<OffersState> {

  constructor(protected store: OffersStore) {
    super(store);
  }

}

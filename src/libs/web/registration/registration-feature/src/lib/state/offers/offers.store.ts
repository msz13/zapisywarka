import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Offer } from './offer.model';

export interface OffersState extends EntityState<Offer> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'offers' })
export class OffersStore extends EntityStore<OffersState> {

  constructor() {
    super();
  }

}

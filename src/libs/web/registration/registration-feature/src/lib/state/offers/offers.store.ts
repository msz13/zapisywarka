import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Offer } from './offer.model';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface OffersState extends EntityState<Offer> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'offers' })
export class OffersStore extends EntityStore<OffersState> {

  constructor() {
    super();
  }

}

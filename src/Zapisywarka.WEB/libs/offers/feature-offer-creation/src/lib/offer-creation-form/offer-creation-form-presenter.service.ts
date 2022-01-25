import { Injectable } from '@angular/core';
import { OfferItem, OfferItemView } from '@zapisywarka-client-aps/offers/domain';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OfferCreationFormPresenterService {

  constructor() { }

  addOfferItem() {
    throw new Error('not implemented')
  }

  addedItem$(): Observable<OfferItemView> {
    return 
  }

}

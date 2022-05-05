import { Injectable } from '@angular/core';
import { Observable, of, timer } from 'rxjs';
import { map } from 'rxjs/operators';
import { Offer } from './offer-model';

@Injectable({
  providedIn: 'root',
})
export class OffersService {
  constructor() {}

  publishOffer(offer: Offer) {
    console.log(offer);
  }

  isNameValid(name: string): Observable<boolean> {
    return timer(800).pipe(
      map((_) => (name == 'Poniedziałek, 13.02' ? false : true))
    );
  }
}

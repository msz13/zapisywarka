import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OfferDetails } from './offer.model';

@Injectable({
  providedIn: 'root'
})
export class OffersApiService {
  
  getAll(): Observable<OfferDetails[]> {
      throw new Error("Method not implemented.");
  }
  
  
  constructor() { }
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReservationInput } from './reservation.model';

@Injectable({
  providedIn: 'root'
})
export class RegistrationDataService {
  
  constructor() { }

  create(offerId: string, reservation: ReservationInput): Observable<boolean> {
    throw new Error("Not implemented")
  }
}

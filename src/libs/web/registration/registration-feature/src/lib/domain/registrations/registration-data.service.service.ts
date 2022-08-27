import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReservationInput } from './reservation.model';

@Injectable({
  providedIn: 'root'
})
export class RegistrationApiService {
  
  constructor() { }

  submitReservation(offerId: string, reservation: ReservationInput): Observable<boolean> {
    throw new Error("Not implemented")
  }
}

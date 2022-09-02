import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigurationService } from '@zapisywarka-web/web-shared-domain';
import { Observable } from 'rxjs';
import { ReservationDetails, ReservationInput } from './reservation.model';

@Injectable({
  providedIn: 'root'
})
export class RegistrationApiService {
  
  constructor(private http: HttpClient, private configuration: ConfigurationService) { }

    submitReservation(offerId: string, reservation: ReservationInput): Observable<ReservationDetails> {
      const baseUrl = this.configuration.getConfig().apiUrl
      const url = baseUrl + `/offers/${offerId}/registrations`
      return this.http.post<ReservationDetails>(url, reservation)
  }
}

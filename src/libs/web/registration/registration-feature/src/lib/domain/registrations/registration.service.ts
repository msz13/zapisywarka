import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, pipe } from 'rxjs';
import { dispatch } from 'rxjs/internal/observable/pairs';
import { map, tap } from 'rxjs/operators';
import { RegistrationApiService } from './registration-data.service.service';
import { RegistrationsState, ReservationInput } from './reservation.model';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  private state: RegistrationsState
  private dispatch: BehaviorSubject<RegistrationsState>

  loading$: Observable<boolean> 
  
  constructor(private apiService: RegistrationApiService) {
    this.state = {
      loading: false
    }
    this.dispatch = new BehaviorSubject<RegistrationsState>(this.state)

    this.loading$ = this.select().pipe(map(state => state.loading))
   }



  submitReservation(offerId: string, reservation: ReservationInput) {
    this.setLoading(true);

    this.apiService.submitReservation(offerId, reservation)
      .pipe(tap(() => this.setLoading(false))).subscribe()
  }

  private setLoading(loadingState: boolean) {
    this.state = {
      ...this.state,
      loading: loadingState
    };
    this.dispatch.next(this.state);
  }

  private select() {
    return this.dispatch.asObservable()
  }
}

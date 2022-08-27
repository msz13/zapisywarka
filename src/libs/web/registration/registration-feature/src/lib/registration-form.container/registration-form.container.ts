import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { OfferDetails } from '../domain/offers/offer.model';
import { OffersService } from '../domain/offers/offers.service';
import { RegistrationApiService } from '../domain/registrations/registration-data.service.service';
import { ReservationInput } from '../domain/registrations/reservation.model';
import { ActivatedRoute } from '@angular/router';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { offerDetatilsListFixture } from '../utills/offer-details-list';
import { JsonPipe } from '@angular/common';
import { NonNullableFormBuilder } from '@angular/forms';
import { RegistrationService } from '../domain/registrations/registration.service';


function filterNill<T> (value: T | null): value is NonNullable<T> {
  return value !=undefined && value != null
} 

@Component({
  selector: 'reg-form-container',
  templateUrl: './registration-form.container.html',
  styleUrls: ['./registration-form.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class RegistrationFormContainer implements OnInit {

  $offer!: Observable<OfferDetails>
  submitting$!: Observable<boolean>
  
  constructor(private offersService: OffersService, private registrationService: RegistrationService, private route: ActivatedRoute) { }

  ngOnInit(): void {    
   
   this.$offer =  this.getSelectedOffer()
   this.submitting$ = this.registrationService.loading$
   
        
  }   

  private getSelectedOffer(): Observable<OfferDetails> {
    return this.route.paramMap.pipe(
      map(params => params.get('offerId')),
      filter(filterNill),
      switchMap(id => this.offersService.selectOfferById(id)),
      filter(filterNill)
    );
  }

  onReservation(reservation: ReservationInput) {
    const offerId = this.route.snapshot.paramMap.get('offerId')
    if(offerId != null) {
      this.registrationService.submitReservation(offerId, reservation)
    }
    
  }

}

import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { OfferDetails } from '../domain/offers/offer.model';
import { OffersService } from '../domain/offers/offers.service';
import { RegistrationDataService } from '../domain/registrations/registration-data.service.service';
import { ReservationInput } from '../domain/registrations/reservation.model';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'reg-form-container',
  templateUrl: './registration-form.container.html',
  styleUrls: ['./registration-form.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class RegistrationFormContainer implements OnInit {

  $offer!: Observable<OfferDetails>
    
  constructor(private offersService: OffersService, private registrationService: RegistrationDataService) { }

  ngOnInit(): void {    
   this.$offer = this.offersService.selectedOffer$           
  }   

  onReservation(reservation: ReservationInput) {
    const offerId = this.offersService.getSelectedOfferId()
    this.registrationService.create(offerId, reservation)
  }

}

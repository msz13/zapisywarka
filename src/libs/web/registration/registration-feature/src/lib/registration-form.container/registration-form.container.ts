import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { OfferDetails } from '../registration-form.model';
import { OffersService } from '../offers.service';
import { RegistrationDataService } from '../registration-data.service.service';
import { ReservationInput } from '../reservation.model';


@Component({
  selector: 'reg-form-container',
  templateUrl: './registration-form.container.html',
  styleUrls: ['./registration-form.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class RegistrationFormContainer implements OnInit {

  $offer!: Observable<OfferDetails>
  
  constructor(private service: OffersService, private registrationService: RegistrationDataService) { }

  ngOnInit(): void {
    this.$offer = this.service.getOne()
  }   

  onReservation(reservation: ReservationInput) {
    this.registrationService.create(reservation)
  }

}

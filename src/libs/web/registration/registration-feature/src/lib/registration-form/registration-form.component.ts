import { ChangeDetectionStrategy, Component, Input, OnInit, Output } from '@angular/core';
import { OfferDetails } from '../domain/offers/offer.model';
import { EventEmitter } from '@angular/core'
import { ReservationInput } from '../domain/registrations/reservation.model';
import { RegistrationFormService } from './registration-form.service';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { JsonPipe } from '@angular/common';



@Component({
  selector: 'reg-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RegistrationFormService]
})
export class RegistrationFormComponent implements OnInit {

  @Input() offer!: OfferDetails
  
 
  @Output() reservation = new EventEmitter<ReservationInput>()

   get registrationForm() {
    return this.formService.aFormGroup
   }

    offeritemAt(index: number) {
    return this.formService.getReservedItemAt(index)
   }

  constructor(public formService: RegistrationFormService, private fb: FormBuilder) {    
    
  }
 
  ngOnInit() {    
    this.formService.setReservetItemsControl(this.offer.offerItems)       
  }
 
  onConfirm() {
   this.reservation.emit(this.formService.getReservationInput())
   
  }

}

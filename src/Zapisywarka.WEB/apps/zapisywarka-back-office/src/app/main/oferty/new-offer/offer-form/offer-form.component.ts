import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';

const OFFER_MSG = {
  END_OFFER_DATE_REQUIRED: 'Wprowadź datę zakończenia zbiórki zapisów',
  COLLECTION_FROM_DATE_REQUIRED: 'Wprowadź datę rozpoczęcia odbioru zamówień'

}

@Component({
  selector: 'app-offer-form',
  templateUrl: './offer-form.component.html',
  styleUrls: ['./offer-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OfferFormComponent implements OnInit {

  @Input() minDate: Date

  offerForm: FormGroup
    
  

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
   this.offerForm =  this.fb.group({
      offerName: ['', 
        [RxwebValidators.required({message: "Wpisz nazwę oferty - pole jest wymagane"}), 
        RxwebValidators.minLength({value:3, message: 'Nazwa oferty musi mieć minimalnie {{1}} znaki'}), 
        RxwebValidators.maxLength({value:60, message: 'Nazwa oferty musi mieć maksymalnie 60 znaków'})]],
      endOfferDate: [null, [RxwebValidators.required({message: OFFER_MSG.END_OFFER_DATE_REQUIRED})]],
      collectionDate: this.fb.group({
        from: [new Date(), RxwebValidators.required({message: OFFER_MSG.COLLECTION_FROM_DATE_REQUIRED})],
        to: [new Date()]
      })


    })


  }

  get offer() {return this.offerForm.value}

  get offerName() { return this.offerForm.get("offerName")}
  get endOfferDate() { return this.offerForm.get("endOfferDate")}
  get form() { return this.offerForm.get('collectionDate').get('from')}
  get to() { return this.offerForm.get('collectionDate').get('to')}
 
  onSubmit() {
    this.offerForm.markAsDirty()
    this.offerForm.markAsTouched()
    console.log('isvalid'+this.offerForm.valid)
  }

 

 
}

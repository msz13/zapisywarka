import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { OfferItem } from '../registration-form.model';
import { ReservationInput } from '../reservation.model';

@Injectable({providedIn: null})
export class RegistrationFormService {
    
  private form: FormGroup

  constructor(private fb: FormBuilder) {
     this.form = this.fb.group({
      receptionPassword: this.fb.control<string>(""),
      comments: this.fb.control<string>(""),
      reservedItems: this.fb.array([])    
    })   
       
  }

  get aFormGroup() {  
    return this.form
  }

  /* createForm() {
    this.form = this.fb.group({
      receptionPassword: this.fb.control<string>(""),
      comments: this.fb.control<string>(""),
      reservedItems: this.fb.array([])    
    })
  } */

  aGroup() {
    this.form = this.fb.group({
      receptionPassword: this.fb.control<string>(""),
      comments: this.fb.control<string>(""),
      reservedItems: this.fb.array([])   
    })
    return this.form
  }

  setReservetItemsControl(offerItems: OfferItem[]) {
    this.form.setControl("reservedItems", this.formArrayFromOfferItems(offerItems))
  }  

  getReservedItemAt(index: number): FormGroup {
    const array =  this.form.get("reservedItems") as FormArray
    return array.at(index) as FormGroup
  }


  getReservationInput(): ReservationInput {
    const { reservedItems, ...rest} = this.form.getRawValue() as ReservationInput
    const transformedReservedItems = reservedItems.filter(item => item.quantity > 0)
      .map(item => {
        const transformed = {
          ...item,
          quantity: Number(item.quantity)
        }
        return transformed
      })
    
    return {reservedItems: transformedReservedItems, ...rest }
  }

  private formArrayFromOfferItems(offerItems: OfferItem[]) {
    const array: FormGroup[] = [] 
    offerItems.forEach(item =>{
      array.push(this.fb.group({
        offerItemId: this.fb.control({value: item.offerItemId, disabled: true}),
        quantity: this.fb.control(0)
      }))
    })
    return this.fb.array(array)
  }
}

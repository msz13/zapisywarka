import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OfferCreationFormComponent } from './offer-creation-form/offer-creation-form.component';
import { SharedMaterialModule} from '@zapisywarka.web/material'

@NgModule({
  declarations: [
    OfferCreationFormComponent
  ],
  imports: [
    CommonModule,   
    SharedMaterialModule
  ],
  exports: [OfferCreationFormComponent]
})
export class NewOfferModule { }

import { NbButtonModule, NbLayoutModule, NbOptionModule, NbSelectModule } from '@nebular/theme';
import { Meta, Story } from '@storybook/angular/types-6-0';
import {RouterTestingModule} from '@angular/router/testing'
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {OfferItemsFormComponent} from "./offer-items-form.component"
import { ThemeModule } from '@zapisywarka-client-aps/shared/theme';
import { moduleMetadata } from '@storybook/angular/dist/client/preview/types';
import {action} from '@storybook/addon-actions'


export default {
  title: 'Components/OfferItemsFormComponent',
  component: OfferItemsFormComponent,
   
  }  as Meta;

  const actionData = {
    onRemove: action('onRemove')
  }

  const form = new FormGroup({
    offerItems: new FormArray([new FormGroup({
      catalogItemId: new FormControl(1),
      name: new FormControl("Bochenek tradycyjny"),
      category: new FormControl("1"),
      price: new FormControl(9),
      avaibleQuantity: new FormControl(90)
    }), new FormGroup({
      catalogItemId: new FormControl(5),
      name: new FormControl("Foremkowy"),
      category: new FormControl(2),
      price: new FormControl(6),
      avaibleQuantity: new FormControl(60)
    }),
    new FormGroup({
      catalogItemId: new FormControl(4),
      name: new FormControl("Foremkowy żurawiną"),
      category: new FormControl(2),
      price: new FormControl(6),
      avaibleQuantity: new FormControl(50)
    })])
  })

export const Default = () => ({
  component: OfferItemsFormComponent, 
  moduleMetadata: {
    declarations: [OfferItemsFormComponent],
    imports: [ThemeModule.forRoot(), 
      NbLayoutModule,  
      RouterTestingModule.withRoutes([]), 
      ReactiveFormsModule, 
      FormsModule,
      NbButtonModule]
  }, 
  props:{
    onRemove: actionData.onRemove,
    offerItemsForm: form
  },
  template: `
  <nb-layout>
    <nb-layout-column style="max-width: 66%">
      <app-offer-items-form [offerItemsForm]="offerItemsForm" (remove)="onRemove($event)"></app-offer-items-form>
    </nb-layout-column>  
  </nb-layout>
  ` ,
});






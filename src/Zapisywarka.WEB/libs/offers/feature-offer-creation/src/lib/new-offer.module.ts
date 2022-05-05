import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewOfferComponent } from './new-offer.component';
import { ThemeModule } from '@zapisywarka-client-aps/shared/theme';
import { NbDatepickerModule } from '@nebular/theme';

import { OfferItemsComponent } from './offer-form/offer-items/offer-items.component';
import { CatalogItemsSelectComponent } from './offer-form/offer-items/catalog-items-select/catalog-items-select.component';
import { CatalogItemsSelectPipe } from './offer-form/offer-items/catalog-items-select/catalog-items-select.pipe';
import { TestComponent } from './test/test.component';


@NgModule({
  declarations: [
    NewOfferComponent, 
    OfferItemsComponent,
    CatalogItemsSelectComponent,
    CatalogItemsSelectPipe,
    TestComponent
  ],
  imports: [
    CommonModule,
    NbDatepickerModule,
    ThemeModule,
  ],
  exports: [NewOfferComponent]
})
export class NewOfferModule { }

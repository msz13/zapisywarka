import { NbButtonModule, NbCardModule, NbLayoutModule, NbThemeModule } from '@nebular/theme';
import { Meta} from '@storybook/angular/types-6-0';
import {RouterTestingModule} from '@angular/router/testing'
import { OfferItemsSummaryComponent } from './offer-items-summary.component';
import { CommonModule } from '@angular/common';
import { BrowserModule, platformBrowser } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


export default {
  title: 'Components/OfferItemsSummary',
  component: OfferItemsSummaryComponent,
   
  }  as Meta;

  export const Default = () => ({
    component: OfferItemsSummaryComponent, 
    moduleMetadata: {
      declarations: [OfferItemsSummaryComponent],
      imports: [BrowserModule,BrowserAnimationsModule, CommonModule, NbThemeModule.forRoot({name: 'default'}), NbLayoutModule, NbCardModule, NbButtonModule, RouterTestingModule.withRoutes([])]
    }, 
    props: {
      totalQuantity: 140,
      totalValue: 1100
    },
    template: `
    <nb-layout>
      <nb-layout-column style="max-width: 66%">
        <nb-card status="success" >
          <nb-card-header>Nebula</nb-card-header>
          <nb-card-body>
          <app-offer-items-summary [totalQuantity]="totalQuantity" [totalValue]="totalValue"></app-offer-items-summary>
          <button nbButton status="primary" >Hello World</button>
          </nb-card-body>
        </nb-card>
      </nb-layout-column>  
    </nb-layout>
    ` ,
  })

/*
export const Default = () => ({
  component: OfferItemsSummaryComponent, 
  moduleMetadata: {
    declarations: [OfferItemsSummaryComponent],
    imports: [ThemeModule.forRoot(), NbLayoutModule, NbCardComponent]
  }, 
  template: `
  <nb-layout>
    <nb-layout-column style="max-width: 66%">
      <nb-card>
        <app-offer-items-summary></app-offer-items-summary>
      </nb-card>
    </nb-layout-column>  
  </nb-layout>
  ` ,
});
*/






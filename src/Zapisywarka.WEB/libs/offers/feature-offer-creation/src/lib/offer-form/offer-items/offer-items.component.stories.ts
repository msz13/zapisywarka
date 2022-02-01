import { moduleMetadata } from '@storybook/angular';
import { ThemeModule } from '@zapisywarka-client-aps/shared/theme';
import { OfferItemsComponent } from './offer-items.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NewOfferModule } from '../../new-offer.module';
import { CatalogItemsSelectComponent } from './catalog-items-select/catalog-items-select.component';
import { CatalogItemsSelectPipe } from './catalog-items-select/catalog-items-select.pipe';
import {
  CATALOG_CATEGORIES,
  CATALOG_ITEMS,
} from '@zapisywarka-client-aps/catalog/utills/testing';
import {
  NbButtonModule,
  NbCardComponent,
  NbCardModule,
  NbLayoutModule,
  NbOptionModule,
  NbSelectModule,
  NbThemeModule,
} from '@nebular/theme';
import { ReactiveFormsModule } from '@angular/forms';

export default {
  title: 'OfferItemsComponent',
  component: OfferItemsComponent,
  decorators: [
    moduleMetadata({
      //👇 Imports both components to allow component composition with storybook
      declarations: [OfferItemsComponent],
      imports: [
        NbThemeModule.forRoot(),
        RouterTestingModule,
        NbLayoutModule,
        NbCardModule,
        NbButtonModule,
      ],
    }),
  ],
};

export const NoSelectedItems = () => ({
  template: `
  <nb-layout>
  <nb-layout-column style="max-width: 66%">
    <nb-card>
      <nb-card-body>
        <app-offer-items></app-offer-items>
      </nb-card-body>
    </nb-card>
  </nb-layout-column>  
</nb-layout>
  `,
  component: OfferItemsComponent,
  props: {},
});

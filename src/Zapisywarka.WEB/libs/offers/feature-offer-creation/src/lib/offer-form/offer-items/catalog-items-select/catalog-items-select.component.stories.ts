import { text, number, boolean, object } from '@storybook/addon-knobs';
import { CatalogItemsSelectComponent } from './catalog-items-select.component';
import { moduleMetadata } from '@storybook/angular'
import { CatalogItemsSelectPipe } from './catalog-items-select.pipe';
import { ThemeModule } from '@zapisywarka-client-aps/shared/theme';
import { RouterTestingModule } from '@angular/router/testing';
import { NbButtonModule, NbLayoutModule, NbOptionModule, NbOverlayModule, NbSelectModule, NbThemeModule } from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbSharedModule } from '@nebular/theme/components/shared/shared.module';

export default {
  title: 'CatalogItemsSelectComponent',
  decorators: [
    moduleMetadata({
      //👇 Imports both components to allow component composition with storybook
      declarations: [
        CatalogItemsSelectComponent,
        CatalogItemsSelectPipe
      ],
      imports: [NbThemeModule.forRoot({name: 'default'}),  RouterTestingModule, NbButtonModule, FormsModule, ReactiveFormsModule, NbSelectModule, NbLayoutModule, NbOverlayModule],
    }),
  ]

}

export const primary = () => ({
  moduleMetadata: {
    imports: []
  },
  component: CatalogItemsSelectComponent,
  props: {
    catalogItems: object('catalogItems', [{
    id: 1,
    categoryId: 1,
    name: 'pierwszy'
  }, {
    id: 2,
    categoryId: 1,
    name: 'drugi'
  }]),
    categories: object('categories', [{
    id: 1,
    name: "kategoria"
  }]),
  }
})
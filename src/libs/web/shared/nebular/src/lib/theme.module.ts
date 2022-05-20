import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NbActionsModule,
  NbLayoutModule,
  NbMenuModule,
  NbSearchModule,
  NbSidebarModule,
  NbUserModule,
  NbContextMenuModule,
  NbButtonModule,
  NbSelectModule,
  NbIconModule,
  NbThemeModule,
  NbCardModule,
  NbCardComponent,
  NbStepperModule,
  NbInputModule,
  NbDatepickerModule,
  NbListModule,
  NbSpinnerComponent,
  NbSpinnerModule,
  NbFormFieldModule,
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import {
  FooterComponent,
  HeaderComponent,
  LayoutDirectionSwitcherComponent,
  SearchInputComponent,
  SwitcherComponent,
} from './components';
import {
  CapitalizePipe,
  PluralPipe,
  RoundPipe,
  TimingPipe,
  NumberWithCommasPipe,
} from './pipes';
import {
  OneColumnLayoutComponent,
  ThreeColumnsLayoutComponent,
  TwoColumnsLayoutComponent,
} from './layouts';
import { DEFAULT_THEME } from './styles/theme.default';
import { COSMIC_THEME } from './styles/theme.cosmic';
import { CORPORATE_THEME } from './styles/theme.corporate';
import { DARK_THEME } from './styles/theme.dark';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { InputErrorsComponent } from './components/input-error/input-errors.component';
import { AppControlErrorDirective } from './components/input-error/app-control-error.directive';
import { DeleteConfirmationComponent } from './components/delete-confirmation/delete-confirmation.component';
import { NameInputComponent } from './components/name-input/name-input.component';
import { AppCurrencyDirective } from './directives/currency/app-currency.directive';
import { CatalogCategoryFilterComponent } from './components/catalog-category-filter/catalog-category-filter.component';
import { TextSearchComponent } from './components/text-search/text-search.component';
import { EditIconComponent } from './components/edit-icon/edit-icon.component';
import { DateTimeInputComponent } from './components/date-time-input/date-time-input.component';

const NB_MODULES = [
  NbLayoutModule,
  NbMenuModule,
  NbUserModule,
  NbActionsModule,
  NbSearchModule,
  NbSidebarModule,
  NbContextMenuModule,
  NbButtonModule,
  NbSelectModule,
  NbIconModule,
  NbEvaIconsModule,
  NbCardModule,
  NbStepperModule,
  NbInputModule,
  NbDatepickerModule,
  NbSpinnerModule,
  RxReactiveFormsModule,
  NbFormFieldModule,
  NgxDatatableModule.forRoot({
    messages: {
      emptyMessage: 'Brak danych',
      totalMessage: 'Wszystkich wiadomości jest',
      selectedMessage: 'Wybrano następujące komórki',
    },
  }),
  FormsModule,
];

const NB_EXPORT_MODULES = [
  NbLayoutModule,
  NbCardModule,
  NbIconModule,
  NbStepperModule,
  NbButtonModule,
  NbInputModule,
  RxReactiveFormsModule,
  NbSelectModule,
  NbListModule,
  NbSpinnerModule,
  NgxDatatableModule,
  NbFormFieldModule,
  FormsModule,
];

const COMPONENTS = [
  SwitcherComponent,
  LayoutDirectionSwitcherComponent,
  HeaderComponent,
  FooterComponent,
  SearchInputComponent,
  OneColumnLayoutComponent,
  ThreeColumnsLayoutComponent,
  TwoColumnsLayoutComponent,
  InputErrorsComponent,
  AppControlErrorDirective,
  AppCurrencyDirective,
  DeleteConfirmationComponent,
  NameInputComponent,
  EditIconComponent,
  DateTimeInputComponent,
  CatalogCategoryFilterComponent,
  TextSearchComponent,
];

const PIPES = [
  CapitalizePipe,
  PluralPipe,
  RoundPipe,
  TimingPipe,
  NumberWithCommasPipe,
];

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, FormsModule, ...NB_MODULES],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ...PIPES,
    ...COMPONENTS,
    ...NB_EXPORT_MODULES,
  ],
  declarations: [...COMPONENTS, ...PIPES],
})
export class ThemeModule {
  static forRoot(): ModuleWithProviders<ThemeModule> {
    return {
      ngModule: ThemeModule,
      providers: [
        ...NbThemeModule.forRoot(
          {
            name: 'default',
          },
          [DEFAULT_THEME, COSMIC_THEME, CORPORATE_THEME, DARK_THEME]
        ).providers,
      ],
    };
  }
}

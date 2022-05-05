/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import { ThemeModule } from '@zapisywarka-client-aps/shared/theme';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {
  NbChatModule,
  NbDatepickerModule,
  NbDialogModule,
  NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule,
} from '@nebular/theme';
import { MainModule } from './main/main.module';
import { CatalogModule } from '@zapisywarka-client-aps/catalog/feature-catalog';
import { environment } from '../environments/environment';
import {AkitaNgDevtools} from '@datorama/akita-ngdevtools'



@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,     
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    NbChatModule.forRoot({
      messageGoogleMapKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY',
    }),
    CoreModule.forRoot(),
    ThemeModule.forRoot(),
  /*  ErrorTailorModule.forRoot({errors: {useValue: {
      required: 'Pole wymagane z bibl'
    }}}), */
    MainModule,
    AppRoutingModule,
    CatalogModule,
    environment.production ? [] : AkitaNgDevtools.forRoot()    
  ], 
  bootstrap: [AppComponent],
})
export class AppModule {
}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {SharedUiModule} from '@zapisywarka-client-aps/shared/ui'
import {SharedMaterialModule} from '@zapisywarka.web/material';
import { HomePageComponent } from './main-component/home-page/home-page.component';
import { MainComponent } from './main-component/main.component'
import { AppRoutingModule } from './app-routing.module';
import { AuthenticationDomainModule } from '@zapisywarka-client-aps/authentication/domain';
import { LoadingComponent } from './loading/loading.component';





@NgModule({
  declarations: [AppComponent, HomePageComponent, MainComponent, LoadingComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,    
    SharedUiModule,
    SharedMaterialModule,
    AuthenticationDomainModule.forRoot()    
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

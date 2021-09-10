import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedUiModule } from '@zapisywarka-client-aps/shared/ui';
import { SharedMaterialModule } from '@zapisywarka.web/material';
import { HomePageComponent } from './main-component/home-page/home-page.component';
import { MainComponent } from './main-component/main.component';
import { AppRoutingModule } from './app-routing.module';
import { IdentityDomainModule } from '@zapisywarka-client-aps/identity/domain';
import { LoadingComponent } from './loading/loading.component';
import { SharedDomainModule } from '@zapisywarka-client-aps/shared/domain';
import { IdentitySignUpFeatureModule } from '@zapisywarka-client-aps/identity/sign-up-feature';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    MainComponent,
    LoadingComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedUiModule,
    SharedMaterialModule,
    IdentityDomainModule.forRoot(),
    IdentitySignUpFeatureModule,
    SharedDomainModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

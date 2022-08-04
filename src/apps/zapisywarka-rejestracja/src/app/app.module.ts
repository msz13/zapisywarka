import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedUiKitModule } from '@zapisywarka-web/web-shared-ui-kit';
import { SharedMaterialModule } from '@zapisywarka-web/web-shared-material';
import { HomePageComponent } from './main-component/home-page/home-page.component';
import { MainComponent } from './main-component/main.component';
import { AppRoutingModule } from './app-routing.module';
import { LoadingComponent } from './loading/loading.component';
import { WebSharedDomainModule } from '@zapisywarka-web/web-shared-domain';
import { IdentityDomainModule } from '@zapisywarka-client-aps/web-identity-domain'
//import { WebIdentitySignUpFeatureDepModule } from '@zapisywarka-web/web-identity-sign-up-feature-dep';

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
    SharedUiKitModule,
    SharedMaterialModule,
    IdentityDomainModule,
    //WebIdentitySignUpFeatureDepModule,
    WebSharedDomainModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WebSharedUiKitModule } from '@zapisywarka-web/web-shared-ui-kit';
import { WebSharedMaterialModule } from '@zapisywarka-web/web-shared-material';
import { HomePageComponent } from './main-component/home-page/home-page.component';
import { MainComponent } from './main-component/main.component';
import { AppRoutingModule } from './app-routing.module';
import { WebIdentityDomainModule } from '@zapisywarka-client-aps/web-identity-domain';
import { LoadingComponent } from './loading/loading.component';
import { WebSharedDomainModule } from '@zapisywarka-web/web-shared-domain';
import { WebIdentitySignUpFeatureDepModule } from '@zapisywarka-web/web-identity-sign-up-feature-dep';

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
    WebSharedUiKitModule,
    WebSharedMaterialModule,
    // WebIdentityDomainModule.forRoot(),
    WebIdentitySignUpFeatureDepModule,
    WebSharedDomainModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { OAuthModule } from 'angular-oauth2-oidc';

@NgModule({
  imports: [
    HttpClientModule,
    OAuthModule.forRoot()
  ],
})
export class AuthenticationDomainModule {}
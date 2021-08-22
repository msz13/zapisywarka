import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {OAuthService} from 'angular-oauth2-oidc'
import { authCodeFlowConfig, signUpPageUrl } from './auth.config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private oauthService: OAuthService, private router: Router) {}
  
  login() {
    this.oauthService.configure(authCodeFlowConfig);
    return this.oauthService.loadDiscoveryDocumentAndLogin({
      
      onTokenReceived: context =>{
        console.log('token: '+JSON.stringify(context.accessToken));
        
      }
    });

  }

  signUp() {
    window.location.href = signUpPageUrl 
  }

  isLoggedIn() {
    return this.oauthService.hasValidAccessToken && this.oauthService.hasValidIdToken
  }
 
}

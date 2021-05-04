import { Injectable } from '@angular/core';
import {OAuthService} from 'angular-oauth2-oidc'
import { authCodeFlowConfig } from './auth.config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private oauthService: OAuthService) {}
  
  login() {
    this.oauthService.configure(authCodeFlowConfig);
    this.oauthService.loadDiscoveryDocumentAndLogin();
  }
 
}

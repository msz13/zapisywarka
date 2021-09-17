import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { ConfigurationService } from '@zapisywarka-client-aps/shared/domain';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private oauthService: OAuthService,
    private conf: ConfigurationService
  ) {}

  login() {
    const authCodeFlowConfig: AuthConfig = {
      issuer: this.conf.getConfig().apiUrl,
      redirectUri: window.location.origin + '/index.html',
      clientId: 'web',
      responseType: 'code',
      scope: 'openid profile Zapisywarka.API',
      showDebugInformation: true,
      timeoutFactor: 0.01,
    };

    this.oauthService.configure(authCodeFlowConfig);

    return this.oauthService.loadDiscoveryDocumentAndLogin({
      onTokenReceived: (context) => {
        console.log('token: ' + JSON.stringify(context.accessToken));
      },
    });
  }

  signUp() {
    window.location.href = this.conf.getConfig().apiUrl + '/sign-up';
  }

  isLoggedIn() {
    return (
      this.oauthService.hasValidAccessToken && this.oauthService.hasValidIdToken
    );
  }
}

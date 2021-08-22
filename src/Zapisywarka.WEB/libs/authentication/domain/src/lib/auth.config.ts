import { AuthConfig } from 'angular-oauth2-oidc';

export const authCodeFlowConfig: AuthConfig = {
  issuer: 'http://localhost:5000',
  redirectUri: window.location.origin + '/index.html',
  clientId: 'spa',
  responseType: 'code',
  scope: 'openid profile Zapisywarka.API',
  showDebugInformation: true,
  timeoutFactor: 0.01
};

export const signUpPageUrl: string = "signUp"
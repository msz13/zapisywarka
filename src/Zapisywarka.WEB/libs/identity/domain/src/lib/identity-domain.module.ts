import { ModuleWithProviders, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MemoryStorage, OAuthModule, OAuthStorage } from 'angular-oauth2-oidc';

export function storageFactory(): OAuthStorage {
  return sessionStorage;
}

@NgModule({
  imports: [HttpClientModule, OAuthModule.forRoot()],
})
export class IdentityDomainModule {
  static forRoot(): ModuleWithProviders<IdentityDomainModule> {
    return {
      ngModule: IdentityDomainModule,
      providers: [{ provide: OAuthStorage, useFactory: storageFactory }],
    };
  }
}

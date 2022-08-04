import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginContainerComponent } from './login-container.component';
import { LoginComponent } from './login/login.component';
import { SharedMaterialModule } from '@zapisywarka-web/web-shared-material';
import { ReactiveFormsModule } from '@angular/forms';
import { IdentityDomainModule } from '@zapisywarka-client-aps/web-identity-domain';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { RouterModule } from '@angular/router';
import { IdentitySharedUiModule } from '@zapisywarka/web/identity/shared-ui';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RxReactiveFormsModule,
    SharedMaterialModule,
    IdentityDomainModule,
    RouterModule,
    IdentitySharedUiModule
  ],
  declarations: [LoginContainerComponent, LoginComponent],
  exports: [LoginContainerComponent, LoginComponent],
})
export class IdentityLoginFeatureModule {}

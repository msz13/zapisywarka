import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginContainerComponent } from './login-container.component';
import { LoginComponent } from './login/login.component';
import { WebSharedMaterialModule } from '@zapisywarka-web/web-shared-material';
import { ReactiveFormsModule } from '@angular/forms';
import { WebIdentityDomainModule } from '@zapisywarka-client-aps/web-identity-domain';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RxReactiveFormsModule,
    WebSharedMaterialModule,
    WebIdentityDomainModule,
    RouterModule,
  ],
  declarations: [LoginContainerComponent, LoginComponent],
  exports: [LoginContainerComponent, LoginComponent],
})
export class WebIdentityLoginFeatureModule {}

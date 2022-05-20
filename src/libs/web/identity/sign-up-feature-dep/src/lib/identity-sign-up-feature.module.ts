import { NgModule } from '@angular/core';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignUpContainerComponent } from './sign-up/sign-up.container.component';
import { SignUpFormComponent } from './sign-up-form/sign-up-form.component';
import { WebIdentityDomainModule } from '@zapisywarka-client-aps/web-identity-domain';
import { WebSharedMaterialModule } from '@zapisywarka-web/web-shared-material';
import { ReactiveFormsModule } from '@angular/forms';
import { WebSharedDomainModule } from '@zapisywarka-web/web-shared-domain';

@NgModule({
  imports: [
    WebIdentityDomainModule,
    WebSharedMaterialModule,
    ReactiveFormsModule,
    WebSharedDomainModule,
  ],
  declarations: [
    SignUpComponent,
    SignUpContainerComponent,
    SignUpFormComponent,
  ],
  exports: [],
})
export class IdentitySignUpFeatureModule {}

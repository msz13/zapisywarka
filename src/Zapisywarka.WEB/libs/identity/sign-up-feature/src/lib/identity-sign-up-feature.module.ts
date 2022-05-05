import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignUpContainerComponent } from './sign-up/sign-up.container.component';
import { SignUpFormComponent } from './sign-up-form/sign-up-form.component';
import { IdentityDomainModule } from '@zapisywarka-client-aps/identity/domain';
import { SharedMaterialModule } from '@zapisywarka.web/material';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedDomainModule } from '@zapisywarka-client-aps/shared/domain';

@NgModule({
  imports: [IdentityDomainModule, SharedMaterialModule, ReactiveFormsModule, SharedDomainModule],
  declarations: [
    SignUpComponent,
    SignUpContainerComponent,
    SignUpFormComponent,
  ],
  exports: []
})
export class IdentitySignUpFeatureModule {}

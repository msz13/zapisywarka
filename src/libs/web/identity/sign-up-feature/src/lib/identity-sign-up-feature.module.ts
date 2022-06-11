import { NgModule } from '@angular/core';
import { SignUpContainerComponent } from './sign-up-container/sign-up-container.component';
import { IdentitySharedUiModule } from '@zapisywarka/web/identity/shared-ui';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [IdentitySharedUiModule, ReactiveFormsModule, CommonModule],
  declarations: [SignUpContainerComponent],
  exports: [SignUpContainerComponent]
})
export class IdentitySignUpFeatureModule {}

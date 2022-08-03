import { NgModule } from '@angular/core';
import { SignUpContainerComponent } from './sign-up-container/sign-up-container.component';
import { IdentitySharedUiModule } from '@zapisywarka/web/identity/shared-ui';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedMaterialModule } from '@zapisywarka-web/web-shared-material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { WebSharedDomainModule } from '@zapisywarka-web/web-shared-domain';

@NgModule({
  imports: [IdentitySharedUiModule, ReactiveFormsModule, CommonModule, SharedMaterialModule, BrowserAnimationsModule, WebSharedDomainModule],
  declarations: [SignUpContainerComponent],
  exports: [SignUpContainerComponent]
})
export class IdentitySignUpFeatureModule {}

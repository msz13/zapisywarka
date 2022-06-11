import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IdentityCardComponent } from './identity-card/identity-card.component';
import { SharedMaterialModule } from '@zapisywarka-web/web-shared-material';
import { ErrorMessageComponent } from './error-message/error-message.component';

@NgModule({
  imports: [CommonModule, SharedMaterialModule],
  declarations: [IdentityCardComponent, ErrorMessageComponent],
  exports: [IdentityCardComponent, ErrorMessageComponent],
})
export class IdentitySharedUiModule {}

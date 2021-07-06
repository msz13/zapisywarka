import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormErrorMessagesPipe } from './form-error-messages/form-error-messages.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [FormErrorMessagesPipe],
  exports: [FormErrorMessagesPipe],
})
export class SharedDomainModule {}

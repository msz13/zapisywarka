import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { WebSharedDomainModule } from '@zapisywarka-web/web-shared-domain';

@NgModule({
  imports: [HttpClientModule, RxReactiveFormsModule, WebSharedDomainModule],
  exports: [],
})
export class IdentityDomainModule {}

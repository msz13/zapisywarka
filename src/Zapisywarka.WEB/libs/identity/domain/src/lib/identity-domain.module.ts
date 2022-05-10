import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { CommonModule } from '@angular/common';
import { SharedDomainModule } from '@zapisywarka-client-aps/shared/domain';
import { LoginService, UserService } from '..';

@NgModule({
  imports: [HttpClientModule, RxReactiveFormsModule],
  exports: [],
})
export class IdentityDomainModule {}

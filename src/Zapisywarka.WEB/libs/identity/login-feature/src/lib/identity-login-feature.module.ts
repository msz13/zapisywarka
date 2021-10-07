import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginContainerComponent } from './login-container.component';
import { LoginComponent } from './login/login.component';
import { SharedMaterialModule } from '@zapisywarka.web/material';
import { SharedDomainModule } from '@zapisywarka-client-aps/shared/domain'
import { ReactiveFormsModule } from '@angular/forms';
import { IdentityDomainModule } from '@zapisywarka-client-aps/identity/domain';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import {RouterModule} from '@angular/router'

@NgModule({
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    RxReactiveFormsModule, 
    SharedMaterialModule, 
    IdentityDomainModule,
    RouterModule
  ],
  declarations: [LoginContainerComponent, LoginComponent],
  exports: [LoginContainerComponent, LoginComponent],
  
})
export class IdentityLoginFeatureModule {}

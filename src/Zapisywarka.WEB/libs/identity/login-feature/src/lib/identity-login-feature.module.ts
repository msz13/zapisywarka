import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginContainerComponent } from './login-container.component';
import { LoginComponent } from './login/login.component';
import { SharedMaterialModule } from '@zapisywarka.web/material';
import {SharedDomainModule} from '@zapisywarka-client-aps/shared/domain'
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, SharedMaterialModule, SharedDomainModule, ReactiveFormsModule],
  declarations: [LoginContainerComponent, LoginComponent],
})
export class IdentityLoginFeatureModule {}

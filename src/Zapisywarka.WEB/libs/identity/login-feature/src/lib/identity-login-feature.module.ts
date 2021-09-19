import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginContainerComponent } from './login-container.component';
import { LoginComponent } from './login/login.component';
import { SharedMaterialModule } from '@zapisywarka.web/material';
import {SharedDomainModule} from '@zapisywarka-client-aps/shared/domain'

@NgModule({
  imports: [CommonModule, SharedMaterialModule, SharedDomainModule],
  declarations: [LoginContainerComponent, LoginComponent],
})
export class IdentityLoginFeatureModule {}

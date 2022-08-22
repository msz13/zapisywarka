import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { RegistrationShellComponent } from './registration-shell/registration-shell.component';
import { RegistrationFormContainer } from './registration-form.container/registration-form.container';
import { HttpClientModule } from '@angular/common/http';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistrationRoutingModule } from './registration-routing.module';


export const registrationFeatureRoutes: Route[] = [];

@NgModule({
  imports: [
    CommonModule, 
    RouterModule, 
    HttpClientModule, 
    ReactiveFormsModule, 
    RegistrationRoutingModule
    
  ],
  declarations: [
    RegistrationShellComponent,
    RegistrationFormContainer,
    RegistrationFormComponent,
  ],
  exports: [RegistrationShellComponent, RegistrationFormContainer],
})
export class RegistrationFeatureModule {}

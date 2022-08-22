import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationFormContainer } from './registration-form.container/registration-form.container';
import { RegistrationShellComponent } from './registration-shell/registration-shell.component';

 export const routes: Routes = [
  {
    path: '',
    component: RegistrationShellComponent,
    children: [{
      path: '1',
      component: RegistrationFormContainer,     
    }]
  }
 
]; 



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistrationRoutingModule { }

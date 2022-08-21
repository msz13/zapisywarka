import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoadOfferResolver } from './domain/offers/load-offer.resolver';
import { RegistrationFormContainer } from './registration-form.container/registration-form.container';
import { RegistrationShellComponent } from './registration-shell/registration-shell.component';

 export const routes: Routes = [
  {
    path: '', 
    component: RegistrationFormContainer,
    /* resolve: {
      offer: LoadOfferResolver
    } */
  }
]; 



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistrationRoutingModule { }

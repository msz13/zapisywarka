import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationFormContainer } from './registration-form.container/registration-form.container';
import { RegistrationShellComponent } from './registration-shell/registration-shell.component';
import { ReservationDetailsContainer } from './reservation-details/reservation-details.container';

 export const routes: Routes = [
  {
    path: '',
    component: RegistrationShellComponent,
    children: [{
      path: ':offerId',
      component: RegistrationFormContainer, 
      children: [
        {
          path: 'rezerwacje/:reservationNumber',
          component: ReservationDetailsContainer
        }
      ]         
    },    
  ]
  }
 
]; 



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistrationRoutingModule { }

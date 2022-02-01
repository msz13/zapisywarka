import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './main-component/home-page/home-page.component';
import { MainComponent } from './main-component/main.component';
import { LandingPageComponent } from '@zapisywarka-client-aps/landing-page';
import { SignUpContainerComponent } from '@zapisywarka-client-aps/identity/sign-up-feature';
import { LoginContainerComponent } from '@zapisywarka-client-aps/identity/login-feature';
import { AuthGuard } from '@zapisywarka-client-aps/identity/domain';

const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
  },
  {
    path: 'logowanie',
    component: LoginContainerComponent,
  },
  {
    path: 'sign-up',
    component: SignUpContainerComponent,
  },
  {
    path: 'main',
    component: MainComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        path: '',
        component: HomePageComponent,
      },
    ],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { initialNavigation: 'enabled' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}

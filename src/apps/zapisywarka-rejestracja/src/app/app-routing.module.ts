import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './main-component/home-page/home-page.component';
import { MainComponent } from './main-component/main.component';
import { WebLandingPageComponent } from '@zapisywarka-client-aps/web-landing-page';
import { LoginContainerComponent } from '@zapisywarka-client-aps/web-identity-login-feature';
import { AuthGuard } from '@zapisywarka-client-aps/web-identity-domain';

const routes: Routes = [
  {
    path: '',
    component: WebLandingPageComponent,
  },
  {
    path: 'logowanie',
    component: LoginContainerComponent,
  },
  // {
  //   path: 'sign-up',
  //   component: SignUpContainerComponent,
  // }, //
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

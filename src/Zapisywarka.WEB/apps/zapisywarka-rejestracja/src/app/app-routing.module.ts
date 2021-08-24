import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './main-component/home-page/home-page.component';
import { MainComponent } from './main-component/main.component';
import { LandingPageComponent } from '@zapisywarka-client-aps/landing-page'

const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent    
  },
  {
    path: 'main',
    component: MainComponent,
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

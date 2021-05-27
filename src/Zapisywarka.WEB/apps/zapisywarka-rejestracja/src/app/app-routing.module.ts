import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  AuthenticationDomainModule,
  AuthGuard,
} from '@zapisywarka-client-aps/authentication/domain';
import { LoadingComponent } from './loading/loading.component';
import { HomePageComponent } from './main-component/home-page/home-page.component';
import { MainComponent } from './main-component/main.component';

const routes: Routes = [
  {
    path: 'start',
    component: MainComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: HomePageComponent,
      },

      /* { 
    path: 'katalog',
    loadChildren: () => import('@zapisywarka-client-aps/catalog/feature-catalog').then(m => m.CatalogModule)
  }, */
    ],
  },
   { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { initialNavigation: 'enabled' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}

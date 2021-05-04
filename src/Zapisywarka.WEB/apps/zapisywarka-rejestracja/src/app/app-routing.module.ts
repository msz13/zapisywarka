import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './main-component/home-page/home-page.component';
import { MainComponent } from './main-component/main.component';

const routes: Routes = [{
  path: "",
  component: MainComponent,
  children: [
    {
      path: "start",
      component: HomePageComponent
  },/* { 
    path: 'katalog',
    loadChildren: () => import('@zapisywarka-client-aps/catalog/feature-catalog').then(m => m.CatalogModule)
  }, */  
  {path: "", redirectTo: 'start', pathMatch: 'full'}  
  
  ]
}, 
{ path: '**', redirectTo: '' }, 
];


@NgModule({
  imports: [RouterModule.forRoot(routes, { initialNavigation: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

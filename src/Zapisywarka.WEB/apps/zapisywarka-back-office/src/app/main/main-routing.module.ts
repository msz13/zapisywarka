import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main.component';
import { StartComponent } from './start/start/start.component';
import { OfertyComponent } from './oferty/oferty.component';
import { CatalogComponent } from '@zapisywarka-client-aps/catalog/feature-catalog';

const routes: Routes = [{
  path: "main",
  component: MainComponent,
  children: [
    {
      path: "start",
      component: StartComponent
  }, { 
    path: 'katalog',
    loadChildren: () => import('../../../../../libs/catalog/feature-catalog/src').then(m => m.CatalogModule)
  }, 
  
  
  {
    path: "",
    redirectTo: "start",
    pathMatch: "full"}
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }

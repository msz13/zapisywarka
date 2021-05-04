import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CatalogComponent } from './catalog/catalog.component';
import { CatalogListComponent } from './catalog-list/catalog-list.component';
import { CatalogItemFormComponent } from './catalog-item-form/catalog-item-form.component';
import { AddCatalogItemComponent } from './add-catalog-item/add-catalog-item.component';
import { UpdateCatalogTemComponent } from './update-catalog-tem/update-catalog-tem.component';
import { CatalogCategoriesComponent } from './categories/categories.component';

const routes: Routes = [ {
  path: '',
  component: CatalogComponent,
  children: [
    {path: '',
     redirectTo: 'pozycje',
     pathMatch: 'full'
    },
    {path: 'pozycje',
     component: CatalogListComponent
    },
    {
      path: 'kategorie',
      component: CatalogCategoriesComponent
    }, {
      path: 'nowa-pozycja',
      component: AddCatalogItemComponent
    }, {
      path:':id',
      component: UpdateCatalogTemComponent
    }, 
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogRoutingModule { }

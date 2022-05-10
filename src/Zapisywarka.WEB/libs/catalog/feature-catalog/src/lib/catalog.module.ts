import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogRoutingModule } from './catalog-routing.module';
import { CatalogItemFormComponent } from './catalog-item-form/catalog-item-form.component';
import { ThemeModule } from '@zapisywarka-client-aps/shared/theme';
import { CatalogComponent } from './catalog/catalog.component';
import { NbWindowModule } from '@nebular/theme';
import { CatalogListComponent } from './catalog-list/catalog-list.component';
import { AddCatalogItemComponent } from './add-catalog-item/add-catalog-item.component';
import { UpdateCatalogTemComponent } from './update-catalog-tem/update-catalog-tem.component';
import { CatalogCategoriesComponent } from './categories/categories.component';
import { NewCategoryComponent } from './categories/new-category/new-category.component';
import { CategoriesListComponent } from './categories/category-list/categories-list.component';

@NgModule({
  declarations: [
    CatalogItemFormComponent,
    CatalogComponent,
    CatalogListComponent,
    AddCatalogItemComponent,
    UpdateCatalogTemComponent,
    CatalogCategoriesComponent,
    NewCategoryComponent,
    CategoriesListComponent,
  ],
  imports: [CommonModule, ThemeModule, NbWindowModule, CatalogRoutingModule],
})
export class CatalogModule {}

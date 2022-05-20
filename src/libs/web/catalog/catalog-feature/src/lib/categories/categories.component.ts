import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {
  CatalogCategoryService,
  CatalogCategory,
  CatalogCategoryQuery,
} from '@zapisywarka-web/web-catalog-category-domain';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CatalogCategoriesComponent implements OnInit {
  $categoriesExists: Observable<boolean>;

  newCategory = new FormControl('', Validators.required);

  $categories: Observable<CatalogCategory[]>;

  constructor(
    private categoryService: CatalogCategoryService,
    private categoryQuery: CatalogCategoryQuery
  ) {}

  ngOnInit(): void {
    this.$categories = this.categoryQuery.selectAll();
    this.$categoriesExists = this.categoryQuery
      .selectCount()
      .pipe(map((count) => count > 0));
  }

  save() {
    this.categoryService.add(this.newCategory.value);
    this.newCategory.reset();
  }

  onUpdate(category: CatalogCategory) {
    this.categoryService.update(category.id, category);
  }
}

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {
  CatalogCategory,
  CatalogCategoryQuery,
} from '@zapisywarka-web/web-catalog-category-domain';
import { ActivatedRoute, Router } from '@angular/router';
import {
  CatalogService,
  NewCatalogItem,
} from '@zapisywarka-web/web-catalog-catalog-item-domain';

@Component({
  selector: 'add-catalog-item',
  templateUrl: './add-catalog-item.component.html',
  styleUrls: ['./add-catalog-item.component.scss'],
})
export class AddCatalogItemComponent implements OnInit {
  $categories: Observable<CatalogCategory[]>;

  constructor(
    private categoryQuery: CatalogCategoryQuery,
    private catalogItemService: CatalogService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.$categories = this.categoryQuery.selectAll();
  }

  onCencel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onSubmit(item: NewCatalogItem) {
    this.catalogItemService.add(item).subscribe();

    this.router.navigate(['../'], { relativeTo: this.route });
  }
}

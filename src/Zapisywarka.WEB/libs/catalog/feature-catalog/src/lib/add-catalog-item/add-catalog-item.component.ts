import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {
  CatalogCategory,
  CatalogCategoryQuery,
} from '@zapisywarka-client-aps/catalog/domain-category';
import { ActivatedRoute, Router } from '@angular/router';
import {
  CatalogService,
  NewCatalogItem,
} from '@zapisywarka-client-aps/catalog/domain-catalog-item';

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

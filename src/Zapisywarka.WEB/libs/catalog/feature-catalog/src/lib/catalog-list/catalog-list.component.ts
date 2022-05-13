import { Component, OnInit } from '@angular/core';
import { Observable, EMPTY } from 'rxjs';
import {
  CatalogQuery,
  CatalogItem,
  CatalogItemView,
  CatalogService,
} from '@zapisywarka-client-aps/catalog/domain-catalog-item';
import { NbDialogService } from '@nebular/theme';
import { switchMap } from 'rxjs/operators';
import { ID } from '@datorama/akita';
import { Router } from '@angular/router';
//TODO przejrzeć to
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { DeleteConfirmationComponent } from '@zapisywarka-client-aps/shared/theme';
import { Id } from '@zapisywarka-client-aps/catalog/domain-category';

@Component({
  selector: 'catalog-list',
  templateUrl: './catalog-list.component.html',
  styleUrls: ['./catalog-list.component.scss'],
})
export class CatalogListComponent implements OnInit {
  $catalogItems: Observable<CatalogItemView[]>;
  $loading: Observable<boolean>;

  page = {
    size: 5,
    offset: 0,
    total: 30,
  };

  constructor(
    private catalogService: CatalogService,
    private catalogQuery: CatalogQuery,
    private router: Router,
    private dialog: NbDialogService
  ) {}

  ngOnInit(): void {
    this.catalogQuery
      .selectHasCache()
      .pipe(
        switchMap((hasCache) => {
          return hasCache ? EMPTY : this.catalogService.get();
        })
      )
      .subscribe();

    this.$loading = this.catalogQuery.selectLoading();

    this.$catalogItems = this.catalogQuery.selectCatalogItems();
  }

  edit(id: ID) {
    this.router.navigate(['../', { id: id }]);
  }

  remove(row: CatalogItem) {
    this.dialog
      .open(DeleteConfirmationComponent, {
        context: {
          message: `Czy potwierdzasz usunięcie pozycji: ${row.name}?`,
        },
      })
      .onClose.subscribe((result) => {
        if (result == true) {
          this.catalogService.remove(row.id).subscribe();
        }
      });
  }

  onCategoryFiltered(id: Id) {
    this.catalogService.updateFilter({ category: id });
  }

  onSearch(term: string) {
    this.catalogService.updateFilter({ name: term });
  }

  onSort(event: any) {
    console.log(JSON.stringify(event.sorts));
  }

  onScroll(event) {
    console.log(JSON.stringify(event));
  }

  onPage(event) {
    console.log(JSON.stringify(event));
  }
}

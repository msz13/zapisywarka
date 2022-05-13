import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
} from '@angular/core';
import { Observable } from 'rxjs';

interface CatalogCategory {
  name: string
}

@Component({
  selector: 'zapisywarka-client-aps',
  templateUrl: './catalog-category-filter.component.html',
  styleUrls: ['./catalog-category-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CatalogCategoryFilterComponent implements OnInit {
  $categories: Observable<CatalogCategory[]>;
  @Output() selected = new EventEmitter<any>();



  ngOnInit(): void {
    this.$categories;
  }

  onSelected(id) {
    this.selected.emit(id);
  }
}

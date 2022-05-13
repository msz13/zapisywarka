import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  EventEmitter,
  Output,
} from '@angular/core';
import {
  CatalogCategory,
  Id,
} from '@zapisywarka-client-aps/catalog/domain-category';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-categories-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoriesListComponent  {
  @Input() categories: CatalogCategory[];
  @Output() updated = new EventEmitter();

  editedCategoryControl = new FormControl();

  edited: Id = null;
 

  edit(category: CatalogCategory) {
    this.edited = category.id;
    this.editedCategoryControl.setValue(category.name);
  }

  isEdited(id: Id) {
    return this.edited ? this.edited == id : false;
  }

  saveEdited() {
    this.updated.emit({
      id: this.edited,
      name: this.editedCategoryControl.value,
    });
    this.edited = null;
  }
}

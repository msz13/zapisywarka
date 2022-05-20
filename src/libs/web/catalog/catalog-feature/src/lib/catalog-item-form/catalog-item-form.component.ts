import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NbWindowService } from '@nebular/theme';
import { CatalogItem } from '@zapisywarka-web/web-catalog-catalog-item-domain';
import { CatalogCategory } from '@zapisywarka-web/web-catalog-category-domain';

@Component({
  selector: 'app-catalog-item-form',
  templateUrl: './catalog-item-form.component.html',
  styleUrls: ['./catalog-item-form.component.scss'],
})
export class CatalogItemFormComponent {
  itemForm: FormGroup = this.fb.group({
    name: [''],
    categoryId: [null],
    price: [null],
    avaibleQuantity: [null],
  });

  @Input() categories: CatalogCategory[];
  @Output() cencel = new EventEmitter();
  @Output() submit = new EventEmitter<CatalogItem>();
  @Input()
  get catalogItem() {
    return this.itemForm.value;
  }
  set catalogItem(value) {
    if (value) {
      this.itemForm.patchValue(value);
    }
  }

  constructor(private fb: FormBuilder, private window: NbWindowService) {}

  onCencel() {
    this.cencel.emit();
  }

  addCategory() {
    throw new Error('Not implemented');
  }

  submitItem() {
    this.submit.emit(this.itemForm.value);
  }
}

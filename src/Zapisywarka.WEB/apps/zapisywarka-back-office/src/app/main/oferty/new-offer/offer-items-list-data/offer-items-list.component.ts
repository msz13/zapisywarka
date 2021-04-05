import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { NgFormsManager } from '@ngneat/forms-manager';
import { OfferItem } from '@zapisywarka-client-aps/offers/domain';
import {
  CatalogItemView,
  CatalogItem,
  CatalogQuery,
  CatalogService,
} from '@zapisywarka-client-aps/catalog/domain-catalog-item';
import { Observable } from 'rxjs';

interface Form {
  offerItems: OfferItem[];
}

@Component({
  selector: 'app-offer-items-list',
  templateUrl: './offer-items-list.component.html',
  styleUrls: ['./offer-items-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OfferItemsListComponent implements OnInit {
  offerItemsForm = this.fb.group({
    offerItems: this.fb.array(
      [],
      this.fb.group({
        name: [],
      })
    ),
  });

  get offerItems() {
    return this.offerItemsForm.get('offerItems') as FormArray;
  }

  get offerItemsValue() {
    return this.offerItems.value;
  }

  $catalogItems: Observable<CatalogItem[]>;

  dropdownSettings = {};

  selectedItems: CatalogItemView[] = [];

  constructor(
    private fb: FormBuilder,
    private formsManager: NgFormsManager<Form>,
    private catalogItemsQuery: CatalogQuery,
    private catalogService: CatalogService
  ) {}

  ngOnInit(): void {
    this.dropdownSettings = {
      singleSelection: false,
      text: 'Wybierz pozycje',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      labelKey: 'name',
      groupBy: 'category',
      classes: 'my-class',
    };
    /*
    this.catalogItemsQuery.selectHasCache()
      .pipe(switchMap(hasCache => {
        return hasCache? empty : this.catalogService.get()
      })).subscribe()

    this.$catalogItems = this.catalogItemsQuery.selectCatalogItems()
*/
    this.selectedItems.forEach((i) => {
      this.offerItems.push(this.createOfferItemControl(i));
    });

    this.formsManager.upsert('offerItems', this.offerItems);
  }

  createOfferItemControl(i: CatalogItemView) {
    const formGr = this.fb.group({
      catalogItemId: [{ value: i.id, disabled: false }],
      name: [{ value: i.name, disabled: true }],
      category: [{ value: i.category, disabled: true }],
      price: [i.price],
      avaibleQuantity: [i.avaibleQuantity],
    });

    return formGr;
  }

  getName(i: number) {
    return this.offerItems.at(i).get('name').value;
  }

  getCategory(i: number) {
    return this.offerItems.at(i).get('category').value;
  }

  get offerItemsLength() {
    return this.offerItems.length;
  }

  submit() {
    console.log(JSON.stringify(this.offerItemsValue));
  }

  onItemSelect(item: any) {
    const itemsArray = this.offerItemsForm.get('offerItems') as FormArray;

    itemsArray.push(this.createOfferItemControl(item));
  }

  onRemove(index) {
    const itemsArray = this.offerItemsForm.get('offerItems') as FormArray;
    itemsArray.removeAt(index);
  }
}

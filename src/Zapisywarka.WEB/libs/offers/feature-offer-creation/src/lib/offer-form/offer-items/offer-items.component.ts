import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  CatalogItem,
  Category,
} from './catalog-items-select/catalog-items-select.component';

@Component({
  selector: 'app-offer-items',
  templateUrl: './offer-items.component.html',
  styleUrls: ['./offer-items.component.scss'],
})
export class OfferItemsComponent implements OnInit {
  @Input() catalogItems: CatalogItem[];
  @Input() categories: Category[];
  @Input() offerItemsControl: FormControl;

  constructor() {}

  ngOnInit(): void {}
}

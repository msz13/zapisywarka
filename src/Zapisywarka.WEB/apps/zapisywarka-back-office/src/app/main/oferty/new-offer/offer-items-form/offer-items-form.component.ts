import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-offer-items-form',
  templateUrl: './offer-items-form.component.html',
  styleUrls: ['./offer-items-form.component.scss'],
})
export class OfferItemsFormComponent implements OnInit {
  @Input() offerItemsForm: FormGroup;

  @Output() remove = new EventEmitter();

  get offerItems() {
    return this.offerItemsForm.get('offerItems') as FormArray;
  }

  get offerItemsValue() {
    return this.offerItems.value;
  }

  getName(i: number) {
    return this.offerItems.at(i).get('name').value;
  }

  getCategory(i: number) {
    return this.offerItems.at(i).get('category').value;
  }

  constructor() {}

  ngOnInit(): void {}

  onRemove(index: any) {
    this.remove.emit(index);
  }
}

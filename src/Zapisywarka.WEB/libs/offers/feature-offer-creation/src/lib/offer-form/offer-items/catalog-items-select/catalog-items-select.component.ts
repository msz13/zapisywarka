import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { ControlValueAccessor, FormControl } from '@angular/forms';
import { ID } from '@datorama/akita';

export interface CatalogItem {
  id: ID,
  name: string,
  categoryId
}

export interface Category {
  id: ID,
  name: string,
}

@Component({
  selector: 'app-catalog-items-select',
  templateUrl: './catalog-items-select.component.html',
  styleUrls: ['./catalog-items-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CatalogItemsSelectComponent implements OnInit, ControlValueAccessor {

  @Input() catalogItems: CatalogItem[] = [{
    id: 1,
    categoryId: 1,
    name: 'pierwszy'
  }, {
    id: 2,
    categoryId: 1,
    name: 'drugi'
  }]
  @Input() categories: Category[] = [{
    id: 1,
    name: "kategoria"
  }]
 


  selectedCount: number

  constructor() { }
  
  setDisabledState?(isDisabled: boolean): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    this.selectedControl.valueChanges.subscribe((val: CatalogItem[]) => {
      this.selectedCount = val.length
       console.log(JSON.stringify(val))
    })
  }

  selected = [{
    id: 1,
    name: 'Bochenek tradycyjny',
    categoryId: 1,
    price: 9,
    avaibleQuantity: 60
  },
  {
    id: 6,
    name: 'Foremkowy z żurawiną',
    categoryId: 2,
    price: 6,
    avaibleQuantity: 40
  }]

  onSelect(selected: any) {
    console.log(JSON.stringify(selected))
  }
  selectedControl = new FormControl([])

  writeValue(obj: any): void {
    this.selectedControl.setValue(obj);
  }
  registerOnChange(fn: any): void {
    throw new Error('Method not implemented.');
  }
  registerOnTouched(fn: any): void {
    throw new Error('Method not implemented.');
  }

  compareById(i1: CatalogItem, i2: CatalogItem): boolean {
    return i1.id === i2.id
  }
  
}

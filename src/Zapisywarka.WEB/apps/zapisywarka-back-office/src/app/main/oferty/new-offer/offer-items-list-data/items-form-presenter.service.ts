import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CatalogItem } from '@zapisywarka-client-aps/catalog/domain-catalog-item';
import { Observable, of, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { OfferItem } from '@zapisywarka-client-aps/offers/domain';

export type OfferItemsSummary = {
  offerItemsTotalQuantity: number;
  offerTotalValue: number;
};

@Injectable({
  providedIn: 'root',
})
export class ItemsFormPresenterService {
  private subject = new Subject<FormArray>();
  private form = new FormArray([]);

  get selected$(): Observable<CatalogItem[]> {
    return this.subject.asObservable().pipe(map((form) => form.getRawValue()));
  }

  get offerForm$(): Observable<FormArray> {
    return this.subject.asObservable();
  }

  get offerItemsSummary$(): Observable<OfferItemsSummary> {
    return this.form.valueChanges.pipe(
      map((items) => {
        const initialSummary = { offerItemsTotalQuantity: 0 };
        const reducer = (summary: OfferItemsSummary, item: OfferItem) => {
          summary.offerItemsTotalQuantity += item.avaibleQuantity;
          return summary;
        };

        return items.reduce(reducer, initialSummary);
      })
    );

    /*
    return this.offerForm$.pipe(map(form => {
      
      const items = form.value as OfferItem[]
      const initialSummary = { offerItemsTotalQuantity: 0 }      
      const reducer = (summary: OfferItemsSummary, item: OfferItem)=>{
        summary.offerItemsTotalQuantity += item.avaibleQuantity
        return summary 
      }

      return items.reduce(reducer, initialSummary)
           
    })
    )

    */
  }

  constructor(private fb: FormBuilder) {}

  mapSelectedToFormArray(selected: CatalogItem[]) {
    const previous = this.form.getRawValue();

    if (selected.length > previous.length) {
      const added = previous?.length
        ? selected.find((i) => !previous.some((p) => p.catalogItemId == i.id))
        : selected[0];
      this.form.push(this.createItemGroup(added));
    } else {
      const removedIndex = previous.findIndex(
        (i) => !selected.some((s) => s.id == i.catalogItemId)
      );
      this.removeFormItem(removedIndex);
    }

    this.subject.next(this.form);
  }

  removeFormItem(index: number) {
    this.form.removeAt(index);

    this.subject.next(this.form);
  }

  private createItemGroup(selected: CatalogItem) {
    return this.fb.group({
      catalogItemId: [selected.id],
      name: [{ value: selected.name, disabled: true }],
      category: [{ value: selected.categoryId, disabled: true }],
      price: [selected.price],
      avaibleQuantity: [selected.avaibleQuantity],
    });
  }
}

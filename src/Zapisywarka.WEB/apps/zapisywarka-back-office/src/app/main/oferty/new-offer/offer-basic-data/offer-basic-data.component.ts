import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  AbstractControl,
  ValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { NgFormsManager } from '@ngneat/forms-manager';
import {
  endCollectionEarlierThanEndOffer,
  endCollectionGraterThanStart,
  UniqueOfferNameValidator,
} from './offer-basic-data-validators';

@Component({
  selector: 'app-offer-basic-data',
  templateUrl: './offer-basic-data.component.html',
  styleUrls: ['./offer-basic-data.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class OfferBasicDataComponent implements OnInit {
  offerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public formsManager: NgFormsManager,
    private uniqueNameValidator: UniqueOfferNameValidator
  ) {}

  ngOnInit(): void {
    this.offerForm = this.fb.group(
      {
        name: [
          '',
          {
            validators: [
              RxwebValidators.required({
                message: 'Wpisz nazwę oferty - pole jest wymagane',
              }),
            ],
          },
        ],
        endOfferDate: [
          null,
          [
            RxwebValidators.required({
              message: 'Wprowadź datę zakończenia zapisów',
            }),
          ],
        ],
        startCollectionDate: [
          null,
          [
            RxwebValidators.required({
              message: 'Wprowadź datę rozpoczęcia odbioru zamówień',
            }),
          ],
        ],
        endCollectionDate: [null],
      },
      {
        validators: [
          endCollectionGraterThanStart,
          endCollectionEarlierThanEndOffer,
        ],
      }
    );

    this.formsManager.upsert('offerBasicData', this.offerForm);
  }

  showErrors(control: AbstractControl) {
    return control.invalid && (control.dirty || control.touched);
  }

  showFormErrors() {
    return (
      (this.offerForm.dirty || this.offerForm.touched) &&
      (this.offerForm.errors?.endCollectionGraterThanStart ||
        this.offerForm.errors?.endCollectionEarlierThanEndOffe)
    );
  }

  validateNameUniqueness() {
    if (this.name.value) {
      this.name.markAsPending();

      this.uniqueNameValidator.validate(this.name.value).subscribe((error) => {
        error ? this.name.setErrors(error) : this.name.markAsTouched();
      });
    }
  }

  onSubmit() {
    this.offerForm.markAllAsTouched();
  }

  get name() {
    return this.offerForm.get('name');
  }

  get endOfferDate() {
    return this.offerForm.get('endOfferDate');
  }

  get startCollectionDate() {
    return this.offerForm.get('startCollectionDate');
  }
}

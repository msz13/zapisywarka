import {
  Spectator,
  createComponentFactory,
  byTextContent,
} from '@ngneat/spectator/jest';
import { OfferBasicDataComponent } from './offer-basic-data.component';
import { ThemeModule } from '../../../../@theme/theme.module';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { NgFormsManager, NgFormsManagerConfig } from '@ngneat/forms-manager';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { NbDatepickerModule } from '@nebular/theme';
import { InputErrorsComponent } from '../../../..//@theme/components/input-error/input-errors.component';
import { toHaveText, createHttpFactory } from '@ngneat/spectator';
import { Offer } from '../../../../@core/state/offers/offer-model';
import { off } from 'process';
import { fakeAsync, tick } from '@angular/core/testing';

describe('nameComponent', () => {
  let spectator: Spectator<OfferBasicDataComponent>;
  const createComponent = createComponentFactory({
    component: OfferBasicDataComponent,
    imports: [
      ThemeModule.forRoot(),
      ReactiveFormsModule,
      RxReactiveFormsModule,
      NbDatepickerModule.forRoot(),
    ],
  });

  beforeEach(() => (spectator = createComponent()));

  it('should init component', () => {
    expect(spectator.component).toExist();
  });

  describe('offer name input', () => {
    it('set value to control after typing', () => {
      spectator.typeInElement('Specjalna', '[data-cy="offer-name"]');

      const name = spectator.component.offerForm.get('name').value;

      expect(name).toBe('Specjalna');
    });

    it.only('fill form group', () => {
      const offerBasicData: Partial<Offer> = {
        name: 'Poniedziałek',
        endOfferDate: new Date(2020, 2, 1, 15, 0),
        startCollectionDate: new Date(2020, 2, 1, 10, 0),
        endCollectionDate: new Date(2020, 2, 1, 17, 0),
      };

      spectator.typeInElement(
        offerBasicData.name,
        '[data-cy="offer-name"] input'
      );
      spectator.typeInElement(
        offerBasicData.endOfferDate.toISOString(),
        '[data-cy="end-offer-date"] input'
      );
      spectator.typeInElement(
        offerBasicData.startCollectionDate.toISOString(),
        '[data-cy="start-collection"] input'
      );
      spectator.typeInElement(
        offerBasicData.endCollectionDate.toISOString(),
        '[data-cy="end-collection"] input'
      );

      const formValue = spectator.component.offerForm.value;
      const formsManagerValue =
        spectator.component.formsManager.getControl('offerBasicData').value;
      expect(formValue).toEqual(offerBasicData);
      expect(formsManagerValue).toEqual(offerBasicData);
    });
  });

  it('set values to form manager', fakeAsync(() => {
    const formsManager = new NgFormsManager(new NgFormsManagerConfig());
    const offerBasicData: Partial<Offer> = {
      name: 'Poniedziałek',
      endOfferDate: new Date(2020, 2, 1, 15, 0),
      startCollectionDate: new Date(2020, 2, 1, 10, 0),
      endCollectionDate: new Date(2020, 2, 1, 17, 0),
    };
    const sut = new OfferBasicDataComponent(new FormBuilder(), formsManager);
    sut.ngOnInit();

    let actual;
    formsManager
      .valueChanges('offerBasicData')
      .subscribe((form) => (actual = form));

    sut.offerForm.get('name').setValue(offerBasicData.name);
    sut.offerForm.get('endOfferDate').setValue(offerBasicData.endOfferDate);
    sut.offerForm
      .get('startCollectionDate')
      .setValue(offerBasicData.startCollectionDate);
    sut.offerForm
      .get('endCollectionDate')
      .setValue(offerBasicData.endCollectionDate);

    tick(10);

    expect(sut.offerForm.value).toEqual(offerBasicData);
    expect(formsManager.hasControl(`'offerBasicData'`)).toBe(true);
    expect(actual).toEqual<Partial<Offer>>(offerBasicData);
  }));

  it.skip('validates startCollectionDate < endCollectionDate', () => {});

  it.skip('sets minimal dates to app input', () => {});

  it('show name is required error', () => {
    spectator.focus('[data-cy="offer-name"]');
    spectator.blur('[data-cy="offer-name"]');

    spectator.detectChanges();

    expect(spectator.query('.control-error')).toExist();
    expect(spectator.query('.control-error')).toHaveText(
      'Wpisz nazwę oferty - pole jest wymagane'
    );
  });
});

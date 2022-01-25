import { Spectator, createComponentFactory } from '@ngneat/spectator/jest';
import { OfferCreationFormComponent } from './offer-creation-form.component';
import {MatDialog} from '@angular/material/dialog'
import { MockModule } from 'ng-mocks';
import { MatFormFieldModule } from '@angular/material/form-field';
import { OfferCreationFormPresenterService } from './offer-creation-form-presenter.service';
import { of } from 'rxjs';
import { fakeAsync, tick } from '@angular/core/testing';


describe('OfferCreationComponent', () => {
  let spectator: Spectator<OfferCreationFormComponent>;
  const createComponent = createComponentFactory({
    component: OfferCreationFormComponent,
    imports: [MockModule(MatFormFieldModule)],
    mocks: [OfferCreationFormPresenterService]
  });
  
  beforeEach(() => {
    spectator = createComponent()

  });

  it('should open offer item form dialog on add item button click', () => {
    const presenter = spectator.inject<OfferCreationFormPresenterService>(OfferCreationFormPresenterService)
    spectator.click('button')
    expect(presenter.addOfferItem).toHaveBeenCalled()
  });

  it('should show added item', fakeAsync(() => {
    const presenter = spectator.inject<OfferCreationFormPresenterService>(OfferCreationFormPresenterService)
    presenter.addedItem$.mockReturnValue(of({name: 'Bochenek'}))
    let offerItems = spectator.queryAll('[data-test=offer-items]')
    expect(offerItems.length).toBe(0);
    spectator.tick()
    offerItems = spectator.queryAll('[data-test=offer-items]')
    expect(offerItems.length).toBe(1);
  }));
});
import { TestBed } from '@angular/core/testing';

import { OfferCreationFormPresenterService } from './offer-creation-form-presenter.service';

describe('OfferCreationFormPresenterService', () => {
  let service: OfferCreationFormPresenterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OfferCreationFormPresenterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

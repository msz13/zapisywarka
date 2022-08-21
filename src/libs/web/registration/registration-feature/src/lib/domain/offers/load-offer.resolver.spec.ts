import { TestBed } from '@angular/core/testing';

import { LoadOfferResolver } from './load-offer.resolver';

describe('LoadOfferResolver', () => {
  let resolver: LoadOfferResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(LoadOfferResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

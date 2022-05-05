import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferItemsSummaryComponent } from './offer-items-summary.component';

describe('OfferItemsSummaryComponent', () => {
  let component: OfferItemsSummaryComponent;
  let fixture: ComponentFixture<OfferItemsSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfferItemsSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferItemsSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

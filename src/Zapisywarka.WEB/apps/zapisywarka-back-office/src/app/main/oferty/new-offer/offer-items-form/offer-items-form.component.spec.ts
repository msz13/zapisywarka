import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferItemsFormComponent } from './offer-items-form.component';

describe('OfferItemsFormComponent', () => {
  let component: OfferItemsFormComponent;
  let fixture: ComponentFixture<OfferItemsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfferItemsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferItemsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

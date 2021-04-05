import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferItemsListComponent } from './offer-items-list.component';

describe('OfferItemsListComponent', () => {
  let component: OfferItemsListComponent;
  let fixture: ComponentFixture<OfferItemsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfferItemsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferItemsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show empty selected items list', ()=>{

  })

  /* -sholud load catalog items list to select
  - should add selected catalog items to form
  - should unselect removed catalog item from from
  - select div should show number of selected items
  - should show sum of quantities of selected items from forms
  - should show defould price and avaible quantity in form inputs
  - it should change price and quantity of selected items
  - should expose offer items array
  */

});

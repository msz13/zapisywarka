import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCatalogItemComponent } from './add-catalog-item.component';

describe('AddCatalogItemComponent', () => {
  let component: AddCatalogItemComponent;
  let fixture: ComponentFixture<AddCatalogItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCatalogItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCatalogItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCatalogTemComponent } from './update-catalog-tem.component';

describe('UpdateCatalogTemComponent', () => {
  let component: UpdateCatalogTemComponent;
  let fixture: ComponentFixture<UpdateCatalogTemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateCatalogTemComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateCatalogTemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

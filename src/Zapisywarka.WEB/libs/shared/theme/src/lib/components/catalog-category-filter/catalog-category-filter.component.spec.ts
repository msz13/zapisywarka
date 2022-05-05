import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogCategoryFilterComponent } from './catalog-category-filter.component';

describe('CatalogCategoryFilterComponent', () => {
  let component: CatalogCategoryFilterComponent;
  let fixture: ComponentFixture<CatalogCategoryFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CatalogCategoryFilterComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogCategoryFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

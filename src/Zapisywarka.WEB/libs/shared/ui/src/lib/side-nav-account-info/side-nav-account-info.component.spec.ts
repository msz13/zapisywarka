import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideNavAccountInfoComponent } from './side-nav-account-info.component';

describe('SideNavAccountInfoComponent', () => {
  let component: SideNavAccountInfoComponent;
  let fixture: ComponentFixture<SideNavAccountInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SideNavAccountInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SideNavAccountInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

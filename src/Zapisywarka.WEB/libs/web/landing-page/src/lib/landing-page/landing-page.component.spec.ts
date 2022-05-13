import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebLandingPageComponent } from './landing-page.component';

describe('WebLandingPageComponent', () => {
  let component: WebLandingPageComponent;
  let fixture: ComponentFixture<WebLandingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WebLandingPageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebLandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUp.ContainerComponent } from './sign-up.container.component';

describe('SignUp.ContainerComponent', () => {
  let component: SignUp.ContainerComponent;
  let fixture: ComponentFixture<SignUp.ContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignUp.ContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUp.ContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

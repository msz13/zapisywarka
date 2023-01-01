import { ComponentFixture, TestBed } from '@angular/core/testing';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';

import { PasswordFieldComponent } from './password-field.component';

describe('PasswordFieldComponent', () => {
  let spectator: Spectator<PasswordFieldComponent>;
  const createComponent = createComponentFactory(PasswordFieldComponent);

  beforeEach(() => spectator = createComponent());

 it('should hide input text by defoult', ()=>{
  
    const input = spectator.query('input') as HTMLInputElement
    expect(input.type).toBe('password')

 })

 it('should show visibility icon by defoult', ()=>{
  
  const icon = spectator.query('mat-icon')
  expect(icon).toHaveExactText('visibility')
  
})

it('should enable to show input text', ()=>{
  
  spectator.click('button')
  spectator.detectChanges()
  const input = spectator.query('input') as HTMLInputElement
  expect(input.type).toBe('text')

})

it('should show visibility_off icon when text is shown', ()=>{
  
  spectator.click('button')
  spectator.detectChanges()
  const icon = spectator.query('mat-icon')
  expect(icon).toHaveExactText('visibility_off')
  

})



});

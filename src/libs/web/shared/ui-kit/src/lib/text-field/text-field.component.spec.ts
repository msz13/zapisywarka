import { Component } from '@angular/core';
import { fakeAsync, tick } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatError } from '@angular/material/form-field';
import { By } from '@angular/platform-browser';
import { byLabel, byText, byTextContent, createComponentFactory, createHostFactory, SpectatorHost } from '@ngneat/spectator/jest';
import { SharedMaterialModule } from '@zapisywarka-web/web-shared-material';

import { TextFieldComponent } from './text-field.component';

const typeInInput = (host: SpectatorHost<TextFieldComponent, CustomHostComponent>, value: any) => {
  const input =host.query('input')
    input.setAttribute('value', value)
    input.dispatchEvent(new Event('change'))
}

@Component({ template: '' })
export class CustomHostComponent {
  control = new FormControl("", [Validators.required, Validators.maxLength(2)])
}

@Component({ template: `<form>
    <sui-text-field [label]="'Nazwa'" [formControl]="control"></sui-text-field>
    <button class="submit-button" type=submit>Submit</button>
</form>` })
export class TestFormComponent {
  control = new FormControl("", [Validators.required])
}

describe('TextFieldComponent', () => {
  let host: SpectatorHost<TextFieldComponent, CustomHostComponent>;
  const createHost = createHostFactory({
    component: TextFieldComponent,
    host: CustomHostComponent,
    imports: [SharedMaterialModule, ReactiveFormsModule]
  });

  const createComponent = createComponentFactory({
    component: TestFormComponent,
    declarations: [TextFieldComponent],
    imports: [SharedMaterialModule, ReactiveFormsModule]
  })

  it('should display label', () => {
    host = createHost(`<sui-text-field [label]="'Nazwa'"></sui-text-field>`);
    expect(host.query('mat-label')).toHaveText('Nazwa');
  });

  it('shuold write text to form control', () =>{
    host = createHost(`
    <form>
      <sui-text-field [label]="'Nazwa'" [formControl]="control"></sui-text-field>
      <button type=submit>Submit</button>
    </form>
    `);
        
    const input = host.query('input')
    host.typeInElement("Test", input)
   
    
    const value = host.hostComponent.control.value
    expect(value).toBe("Test")

  })

  it('shuold bind touch method', () =>{
    host = createHost(`<sui-text-field [label]="'Nazwa'" [formControl]="control"></sui-text-field>`);
    expect(host.hostComponent.control.touched).toBe(false)    
    host.blur('input')
    expect(host.hostComponent.control.touched).toBe(true)
   
  })

  it('shuold show error message', () =>{
    host = createHost(`<sui-text-field [label]="'Nazwa'" [formControl]="control"></sui-text-field>`);
    
    const error1 = host.query('mat-error')
    expect(error1).toBeNull()
    host.blur('input')
    host.detectChanges()
    const error = host.query('mat-error')
    expect(error).not.toBeNull()
    expect(error).toHaveText("Pole ")

  })

  it('should show error message on submit', ()=> {
    const component = createComponent()
    
    const error1 = host.query('mat-error')
    expect(error1).toBeNull()
   
    component.click(byText('Submit'))
    const error = host.query('mat-error')
    expect(error).not.toBeNull()
    expect(error).toHaveText("Pole wymagane")
        
  })

});

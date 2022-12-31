import { Component } from '@angular/core';
import { fakeAsync, tick } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatError } from '@angular/material/form-field';
import { By } from '@angular/platform-browser';
import { byLabel, byText, byTextContent, createComponentFactory, createHostFactory, SpectatorHost } from '@ngneat/spectator/jest';
import { SharedMaterialModule } from '@zapisywarka-web/web-shared-material';

import { TextFieldComponent } from './text-field.component';


@Component({ template: `
  <form>
    <sui-text-field [label]="'Nazwa'" [formControl]="control"></sui-text-field>
    <button class="submit-button" type=submit>Submit</button>
  </form>
  ` })
export class TestFormComponent {
  control = new FormControl("", [Validators.required])
}

describe('TextFieldComponent', () => {
  let host: SpectatorHost<TextFieldComponent, TestFormComponent>;
  const createHost = createHostFactory({
    component: TextFieldComponent,
    host: TestFormComponent,
    imports: [SharedMaterialModule, ReactiveFormsModule],
    detectChanges: true
  });

 
  beforeEach(()=>{
    host = createHost(`
    <form>
      <sui-text-field [label]="'Nazwa'" [formControl]="control"></sui-text-field>
      <button type=submit>Submit</button>
    </form>
    `);
  })

  it('should display label', () => {
    expect(host.query('mat-label')).toHaveText('Nazwa');
  });

  it('shuold write text to form control', () =>{
            
    const input = host.query('input')
    host.typeInElement("Test", input)
   
    
    const value = host.hostComponent.control.value
    expect(value).toBe("Test")

  })

  it('should bind touch method', fakeAsync(() =>{
    
    expect(host.hostComponent.control.touched).toBe(false)    
    //const input = host.query('input')
    //host.blur(input)
    const input = host.query('input')
    expect(input).toExist()
    input.dispatchEvent(new Event('blur'))
    host.tick(300)
    host.detectChanges()
    expect(host.hostComponent.control.touched).toBe(true)
   
  }))

  it('should write value', () =>{
    
    host.hostComponent.control.setValue("test input")

    host.detectChanges()

    const childInput = host.query('input') as HTMLInputElement

    expect(childInput.value).toBe("test input")
   
})

 

});

import { Component, ChangeDetectionStrategy, Input, Renderer2, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core'
import { MatFormFieldControl } from '@angular/material/form-field';

export class CustomErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
   /*  const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted)); */
    console.log("matcher")
    return true
  }
}

@Component({
  selector: 'sui-text-field',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: TextFieldComponent,
    multi: true
  }],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextFieldComponent implements ControlValueAccessor  {

  _onChange: (value: any) => void 
  _onTouched: ()=>void
  matcher = new CustomErrorStateMatcher()

  
   
  @Input() label: string

  constructor(private renderer: Renderer2) {}

  writeValue(obj: any): void {
    console.log('TODO write value')
  }
  registerOnChange(fn: any): void {
    this._onChange = fn    
  } 
  registerOnTouched(fn: any): void {
    this._onTouched = fn
  }
  setDisabledState?(isDisabled: boolean): void {
    console.log('TODO register on set disable')
  }

 

}

import { Component, ChangeDetectionStrategy, Input, OnInit, Optional } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroupDirective, NgForm, NgControl, AbstractControl } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core'
import { tap } from 'rxjs/operators';

export class CustomErrorStateMatcher implements ErrorStateMatcher {

   _isErrorState = false
  
  
  isErrorState(control: AbstractControl<any, any>, form: FormGroupDirective | NgForm): boolean {
    return this._isErrorState
  }

  setErrorState(showError: boolean) {
    this._isErrorState = showError
  }

  }



@Component({
  selector: 'sui-text-field',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.scss'],
/*   providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: TextFieldComponent,
    multi: true
  }], */
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextFieldComponent implements ControlValueAccessor, OnInit  {

  _onChange!: (value: any) => void 
  _onTouched!: ()=>void  
  _innerControl = new FormControl("")
  
   
  @Input() label!: string
  @Input() placeholder = ""
  @Input() hint = ""
  @Input() required = false
  @Input() get showError() {
    return this.matcher._isErrorState
  }
  set showError(value: boolean) {
    this.matcher.setErrorState(value)
  }
  @Input() errorMessage = ''

  matcher  = new CustomErrorStateMatcher() 
  

  constructor(@Optional() private parentControl: NgControl) {
     if(parentControl) {
      parentControl.valueAccessor = this
    } 
    
  }


  ngOnInit(): void {
        
   
    this._innerControl
      .valueChanges
      .pipe(tap(() => {              
        this._onChange(this._innerControl.value)}))
      .subscribe()      
  }

  
  writeValue(obj: any): void {
   this._innerControl.setValue(obj)
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

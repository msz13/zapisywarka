import { Component, ChangeDetectionStrategy, Input, OnInit, Optional } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroupDirective, NgForm, NgControl } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core'
import { tap } from 'rxjs/operators';

export class CustomErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted)); 
   
    //return true
  }
}

export class ParentErrorStateMatcher implements ErrorStateMatcher {

  constructor(private parentControl: NgControl) {}

  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    if(form) {
      console.log("form exist")
    }
    const isSubmitted = form && form.submitted;   
    return !!(this.parentControl && this.parentControl.invalid && (control?.dirty || control?.touched || isSubmitted)); 
   
    //return true
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
  matcher: ErrorStateMatcher  = new CustomErrorStateMatcher() 
  _innerControl = new FormControl("")
  
   
  @Input() label!: string

  constructor(@Optional() private parentControl: NgControl) {
     if(parentControl) {
      parentControl.valueAccessor = this
    } 
    
  }


  ngOnInit(): void {
        
    this.matcher = new ParentErrorStateMatcher(this.parentControl)

    this._innerControl
      .valueChanges
      .pipe(tap(() => {
       
         console.log("touched: "+ this._innerControl.touched + this._innerControl.dirty+this._innerControl.invalid)
        console.log("errors "+ JSON.stringify(this._innerControl.errors))
        this._onChange(this._innerControl.value)}))
      .subscribe()      
  }

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

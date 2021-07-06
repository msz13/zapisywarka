import { Pipe, PipeTransform } from '@angular/core';
import {AbstractControl} from '@angular/forms'


@Pipe({
  name: 'formErrorMessages',
  pure: false
})
export class FormErrorMessagesPipe implements PipeTransform {

  transform(control: AbstractControl | null): string[] {
   
    let errors = control?.errors
                    
    if(!errors) {
        return []
    }
   
    return Object.values(errors).map(error => {
    
     if(!error.message) {
       throw new Error("Form control error has undefined message property")
     } 
     return error.message
    
    });
    
  }
}



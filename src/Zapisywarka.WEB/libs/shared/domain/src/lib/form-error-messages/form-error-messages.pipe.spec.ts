import { FormErrorMessagesPipe } from './form-error-messages.pipe';
import {FormControl} from '@angular/forms'


describe('FormErrorMessagesPipe', () => {

  let control: FormControl
  let pipe: FormErrorMessagesPipe

  beforeEach(() => {
   control = new FormControl('') 
   pipe = new FormErrorMessagesPipe();   
  })

  it('create an instance', () => {
    const pipe = new FormErrorMessagesPipe();
    expect(pipe).toBeTruthy();
  });


  it('should return empty array when there is no error', () => {          
    
    const messages = pipe.transform(control)

    expect(messages).toHaveLength(0)
  })

   it('should return message error when one error', () => {

    control.setErrors({      
      reguired: {
          message: "Nazwa użytkownika jest wymagana"
        }    
    })     

    const messages = pipe.transform(control)

    expect(messages).toHaveLength(1)
    expect(messages[0]).toBe("Nazwa użytkownika jest wymagana")
  })

 it('should return messages when many errors', () => {
    control.setErrors({
      reguired: {
        message: "Nazwa użytkownika jest wymagana"
      }, invalid: {
        message: "Nazwa użytkownika nie jest poprawna"
      }
    })

    const messages = pipe.transform(control)

    expect(messages).toHaveLength(2)
    expect(messages).toStrictEqual(["Nazwa użytkownika jest wymagana", "Nazwa użytkownika nie jest poprawna"])
  })

  it('should return single message with "first" parameter', () => {
    control.setErrors({
      reguired: {
        message: "Nazwa użytkownika jest wymagana"
      }, invalid: {
        message: "Nazwa użytkownika nie jest poprawna"
      }
    })

    const message = pipe.transform(control, 'first')

    expect(message).toBe('Nazwa użytkownika jest wymagana')
  })

  it('should return null when control is null', () => {
    const nullControl: FormControl | null = null

    const messages = pipe.transform(nullControl)

    expect(messages).toHaveLength(0)
   

  })

  it('should throw when error message is undefined', () => {
    control.setErrors({
      reguired: true
    })

    expect(() => pipe.transform(control)).toThrow(new Error("Form control error has undefined message property"))    
   

  })

  it('should throw when error message is empty', () => {
    control.setErrors({
      reguired: {
        message: ""
      }
    })

    expect(() => pipe.transform(control)).toThrow(new Error("Form control error has undefined message property"))    
   

  })


}); 



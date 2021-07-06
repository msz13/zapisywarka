import { AbstractControl, ValidatorFn, ValidationErrors, Validators, FormGroup} from "@angular/forms";

export interface FormErrors extends ValidationErrors {

    [key: string]: {
        message: string
    }
}

//TODO funckje zwracaja error, a nie funkcje walidacji, dodac zwrot tablicy funkcji, zastanowic czy fumkcja get messages ma sens, wyeliminowac bug z user wysylaniem posta

export class SignUpFormValidators {
    
    static getErrorMessagesFor(controlName: string, group: FormGroup): string[] {
        const errors = group.get(controlName)?.errors
                
        if(!errors) {
            return []
        }
       
        return Object.values(errors).map(error => error.message);
        
    }

    static userNameValidators(): ValidatorFn[] {
        return [this.userNameRequired, this.userNameMinLength, this.userNameAllowedCharacters]
    }

    private static userNameAllowedCharacters(control: AbstractControl): FormErrors | null  {
        
            const nonAsciiCharactes = RegExp('[^\u0020-\u007e]').test(control.value)
            if(nonAsciiCharactes) {
                return {allowedCharacters: {
                    message: "Nazwa użytkownika nie może zaweirać polskich znaków."
                }}
            }

            const forbiddenCharacters  = RegExp('[^a-zA-Z0-9-_.]').test(control.value)
             if(forbiddenCharacters) {
                return {allowedCharacters: {
                    message: "Nazwa użytkownika może zwierać tylko litery, cyfry, znaki: -._"
                }}
            }
            return null
    } 

        
    private static userNameRequired(control: AbstractControl) {         
            
            if(Validators.required(control)) {
                return {required: {
                    message: "Nazwa użytkownika jest wymagana"
                }}
            }
            return null
    } 



    private static userNameMinLength(control: AbstractControl) {
        if(Validators.minLength(3)(control)) {
            return {userNameMinLength: {
                message: "Nazwa użytkownika musi mieć minimum 3 znaki"
            }}
        }
        return null
    }


   private static accessTokenRequired(): ValidatorFn {
        return (control: AbstractControl) => {
            if(Validators.required(control)) {
                return {required: {
                    message: "Kod dostępu jest wymagany"
                }}
            }
            return null
        }
    }
}
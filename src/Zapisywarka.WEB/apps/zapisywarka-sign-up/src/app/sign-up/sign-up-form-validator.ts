import { AbstractControl, ValidatorFn, ValidationErrors, Validators} from "@angular/forms";

export interface SignUpFormValidationErrors extends ValidationErrors {

    required: {
        message: string
    }
}


export class SignUpFormValidator {

    static accessTokenRequired(): ValidatorFn {
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
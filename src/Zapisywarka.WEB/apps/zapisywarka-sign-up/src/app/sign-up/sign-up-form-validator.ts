import {
  AbstractControl,
  ValidatorFn,
  ValidationErrors,
  Validators,
  FormGroup,
} from '@angular/forms';

export interface FormErrors extends ValidationErrors {
  [key: string]: {
    message: string;
  };
}



export class SignUpFormValidators {
  static userNameValidators(): ValidatorFn[] {
    return [
      this.userNameRequired,
      this.userNameMinLength,
      this.userNameMaxLength,
      //   this.userNameSpecialCharactersAtTheBegginning,
      //    this.userNameSpecialCharactersAtTheEnd,
      this.userNameSeqTwoOrMorespecialCharacters,
      this.userNameAllowedCharacters,
    ];
  }

  private static userNameAllowedCharacters(
    control: AbstractControl
  ): FormErrors | null {

    const forbiddenCharactersAtEnd = RegExp('[^a-zA-Z0-9]$').test(
      control.value
    );
    if (forbiddenCharactersAtEnd) {
      return {
        specialCharactersAtTheEnd: {
          message: 'Nazwa użytkownika musi kończyć się literą lub cyfrą',
        },
      };
    }

    const forbiddenCharactersAtBegginning = RegExp('^[^a-zA-Z0-9]').test(
      control.value
    );

    if (forbiddenCharactersAtBegginning) {
      return {
        specialCharactersAtTheBegginning: {
          message:
            'Nazwa użytkownika musi zaczynać się od tylko litery lub cyfry',
        },
      };
    } 

  
    const forbiddenCharacters  = RegExp('[^a-zA-Z0-9-_.]').test(control.value)
     if(forbiddenCharacters) {
        return {allowedCharacters: {
            message: "Nazwa użytkownika może zawierać tylko litery, bez polskich i obcych znaków, cyfry, znaki: -._"
        }}
    }
      
    return null;
  }

 
   
  
/* 
  private static userNameSpecialCharactersAtTheBegginning(
    control: AbstractControl
  ) {
    const forbiddenCharacters = RegExp('^[^a-zA-Z0-9]').test(control.value);

    if (forbiddenCharacters) {
      return {
        specialCharactersAtTheBegginning: {
          message:
            'Nazwa użytkownika musi zaczynać się od tylko litery lub cyfry',
        },
      };
    }
    return null;
  }

  private static userNameSpecialCharactersAtTheEnd(control: AbstractControl) {
    const forbiddenCharacters = RegExp('[^a-zA-Z0-9]$').test(control.value);

    if (forbiddenCharacters) {
      return {
        specialCharactersAtTheEnd: {
          message: 'Nazwa użytkownika musi kończyć się literą lub cyfrą',
        },
      };
    }
    return null;
  }
 */
  private static userNameSeqTwoOrMorespecialCharacters(
    control: AbstractControl
  ) {
    const forbiddenCharacters = RegExp('[-._]{2,}').test(control.value);

    if (forbiddenCharacters) {
      return {
        seqTwoOrMorespecialCharacters: {
          message:
            'Nazwa użytkownika nie może zawierać dwóch lub więcej występujących po sobie znaków',
        },
      };
    }
    return null;
  }

  private static userNameRequired(control: AbstractControl) {
    if (Validators.required(control)) {
      return {
        required: {
          message: 'Nazwa użytkownika jest wymagana',
        },
      };
    }
    return null;
  }

  private static userNameMinLength(control: AbstractControl) {
    if (Validators.minLength(3)(control)) {
      return {
        userNameMinLength: {
          message: 'Nazwa użytkownika musi mieć minimum 3 znaki',
        },
      };
    }
    return null;
  }

  private static userNameMaxLength(control: AbstractControl) {
    if (Validators.maxLength(32)(control)) {
      return {
        userNameMinLength: {
          message: 'Nazwa użytkownika musi mieć maksimum 32 znaki',
        },
      };
    }
    return null;
  }

  private static accessTokenRequired(): ValidatorFn {
    return (control: AbstractControl) => {
      if (Validators.required(control)) {
        return {
          required: {
            message: 'Kod dostępu jest wymagany',
          },
        };
      }
      return null;
    };
  }
}

import {
  AbstractControl,
  ValidatorFn,
  ValidationErrors,
  Validators,
  FormControl,
  FormGroupDirective,
  NgForm,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

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
      this.userNameSeqTwoOrMorespecialCharacters,
      this.userNameAllowedCharacters,
    ];
  }

  private static userNameAllowedCharacters(
    control: AbstractControl
  ): FormErrors | null {
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

    const forbiddenCharacters = RegExp('[^a-zA-Z0-9-_.]').test(control.value);
    if (forbiddenCharacters) {
      return {
        allowedCharacters: {
          message:
            'Nazwa użytkownika może zawierać tylko litery, bez polskich i obcych znaków, cyfry, znaki: -._',
        },
      };
    }

    return null;
  }

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
        userNameMaxLength: {
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

  static passwordValidators() {
    return [
      this.passwordRequired,
      this.passwordMinLenght,
      this.passwordMaxLenght,
    ];
  }

  private static passwordRequired(control: AbstractControl) {
    if (Validators.required(control)) {
      return {
        required: {
          message: 'Hasło jest wymagane',
        },
      };
    }
    return null;
  }

  private static passwordMinLenght(control: AbstractControl) {
    if (Validators.minLength(8)(control)) {
      return {
        passwordMinLength: {
          message: 'Hasło musi mieć minimum 8 znaków.',
        },
      };
    }
    return null;
  }

  private static passwordMaxLenght(control: AbstractControl) {
    if (Validators.maxLength(64)(control)) {
      return {
        passwordMaxLength: {
          message: 'Hasło musi mieć maksimum 64 znaków.',
        },
      };
    }
    return null;
  }

  static passwordConfirmationRequired(control: AbstractControl) {
    if (Validators.required(control)) {
      return {
        required: {
          message: 'Potwierdzenie hasła jest wymagane',
        },
      };
    }
    return null;
  }

  static correctPasswordConfirmationValidator(
    group: AbstractControl
  ): FormErrors | null {
    const password = group.get('password');
    const passwordConfirmation = group.get('passwordConfirmation');

    return password?.value &&
      passwordConfirmation?.value &&
      password?.value !== passwordConfirmation?.value
      ? {
          passwordNotMatchedConfirmation: {
            message: 'Hasła nie są takie same',
          },
        }
      : null;
  }
}

export class PasswordConfirmationMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      (control.invalid || form?.invalid) &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

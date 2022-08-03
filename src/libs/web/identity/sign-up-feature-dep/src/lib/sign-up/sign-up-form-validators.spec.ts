import { FormControl, FormGroup } from '@angular/forms';
import { SignUpFormValidators } from './sign-up-form-validator';

describe('sign-up form validators', () => {
  describe('user name', () => {
    let control: FormControl;

    beforeEach(() => {
      control = new FormControl('', SignUpFormValidators.userNameValidators());
    });

    it('should return null when is valid', () => {
      control.setValue('Jan-Adam.sz_3');
      const error = control.errors;
      expect(error).toBeNull();
    });

    it('should be required', () => {
      control.setValue('');
      const error = control.errors;
      expect(error?.required).toBeDefined();
      expect(error?.required.message).toBe('Nazwa użytkownika jest wymagana');
    });

    it('should return error when have less than 3 characters', () => {
      control.setValue('ja');
      const error = control.errors;
      expect(error?.userNameMinLength).toBeDefined();
      expect(error?.userNameMinLength.message).toBe(
        'Nazwa użytkownika musi mieć minimum 3 znaki'
      );
    });

    it('should return null when have 3 characters', () => {
      control.setValue('jan');
      const error = control.errors;
      expect(error).toBeNull();
    });

    it('should return null when have 32 characters', () => {
      control.setValue('ja012345678901234567890123456789');
      const error = control.errors;
      expect(error).toBeNull();
    });

    it('should return error when have more than 33 characters', () => {
      control.setValue('ja0123456789012345678901234567890');
      const error = control.errors;
      expect(error?.userNameMinLength).toBeDefined();
      expect(error?.userNameMinLength.message).toBe(
        'Nazwa użytkownika musi mieć maksimum 32 znaki'
      );
    });

    it('should return error when user name contains not allowed characters', () => {
      control.setValue('ja~n');
      const error = control.errors;
      expect(error).toBeDefined();
      expect(error?.allowedCharacters.message).toBe(
        'Nazwa użytkownika może zawierać tylko litery, bez polskich i obcych znaków, cyfry, znaki: -._'
      );
    });

    it('should return error when user name contains space', () => {
      control.setValue('jan b');
      const error = control.errors;
      expect(error?.allowedCharacters).toBeDefined();
      expect(error?.allowedCharacters.message).toBe(
        'Nazwa użytkownika może zawierać tylko litery, bez polskich i obcych znaków, cyfry, znaki: -._'
      );
    });

    it('should return error when user name contains polish characters', () => {
      control.setValue('bożena');
      const error = control.errors;
      expect(error?.allowedCharacters).toBeDefined();
      expect(error?.allowedCharacters.message).toBe(
        'Nazwa użytkownika może zawierać tylko litery, bez polskich i obcych znaków, cyfry, znaki: -._'
      );
    });

    it('should return error when user name contains emoji', () => {
      control.setValue('bozena字😀s');
      const error = control.errors;
      expect(error?.allowedCharacters).toBeDefined();
      expect(error?.allowedCharacters.message).toBe(
        'Nazwa użytkownika może zawierać tylko litery, bez polskich i obcych znaków, cyfry, znaki: -._'
      );
    });

    it('should return error when user name contains special character at the beginning', () => {
      control.setValue('.bozena');
      const error = control.errors;
      expect(error?.specialCharactersAtTheBegginning).toBeDefined();
      expect(error?.specialCharactersAtTheBegginning.message).toBe(
        'Nazwa użytkownika musi zaczynać się od tylko litery lub cyfry'
      );
    });

    it('should return null when user name contains digit at the beginning', () => {
      control.setValue('1bozena');
      const error = control.errors;
      expect(error).toBeNull();
    });

    it('should return error when user name contains special character at the end', () => {
      control.setValue('bozena-');
      const error = control.errors;
      expect(error?.specialCharactersAtTheEnd).toBeDefined();
      expect(error?.specialCharactersAtTheEnd.message).toBe(
        'Nazwa użytkownika musi kończyć się literą lub cyfrą'
      );
    });

    it('should return error when user name contains sequeunce of two special character', () => {
      control.setValue('boz.-ena');
      const error = control.errors;
      expect(error?.seqTwoOrMorespecialCharacters).toBeDefined();
      expect(error?.seqTwoOrMorespecialCharacters.message).toBe(
        'Nazwa użytkownika nie może zawierać dwóch lub więcej występujących po sobie znaków'
      );
    });

    it('should return one error when user name contains invalid characer at the end', () => {
      control.setValue('ja%');
      const error = control.errors;
      expect(error?.specialCharactersAtTheEnd).toBeDefined();
      expect(error?.specialCharactersAtTheEnd.message).toBe(
        'Nazwa użytkownika musi kończyć się literą lub cyfrą'
      );
      expect(error?.allowedCharacters).toBeUndefined();
      expect(error?.specialCharactersAtTheBegginning).toBeUndefined();
    });

    it('should one error when two invalid characters', () => {
      control.setValue('ja%$l');
      const error = control.errors;
      expect(error?.allowedCharacters).toBeDefined();
      expect(error?.allowedCharacters.message).toBe(
        'Nazwa użytkownika może zawierać tylko litery, bez polskich i obcych znaków, cyfry, znaki: -._'
      );
      expect(error?.seqTwoOrMorespecialCharacters).toBeUndefined();
    });
  });

  describe('Same password and password confirmation validator', () => {
    let group: FormGroup;

    beforeEach(
      () =>
        (group = new FormGroup(
          {
            password: new FormControl(''),
            passwordConfirmation: new FormControl(''),
          },
          SignUpFormValidators.correctPasswordConfirmationValidator
        ))
    );

    it('shoud return null when there is no input', () => {
      expect(group.errors).toBeNull();
    });

    it('shoud return null when password is missing', () => {
      group.get('passwordConfirmation')?.setValue('pass');

      expect(group.errors).toBeNull();
    });

    it('should return null when passwordConfirmation is missing', () => {
      group.get('password')?.setValue('pass');

      expect(group.errors).toBeNull();
    });

    it('should return null when passwordConfirmation is equal to password', () => {
      group.get('password')?.setValue('pass');
      group.get('passwordConfirmation')?.setValue('pass');

      expect(group.errors).toBeNull();
    });

    it('should return error when passwordConfirmation is not equal to password', () => {
      group.get('password')?.setValue('pass1');
      group.get('passwordConfirmation')?.setValue('pass');
      const error = group.errors;
      expect(error?.passwordNotMatchedConfirmation).toBeDefined();
      expect(error?.passwordNotMatchedConfirmation.message).toBe(
        'Hasła nie są takie same'
      );
    });
  });

  describe('password validation', () => {
    let control: FormControl;

    beforeEach(
      () =>
        (control = new FormControl(
          '',
          SignUpFormValidators.passwordValidators()
        ))
    );
    it('should return error when password is less than eight characters', () => {
      control.setValue('pass1');
      const error = control.errors;
      expect(error?.passwordMinLength).toBeDefined();
      expect(error?.passwordMinLength.message).toBe(
        'Hasło musi mieć minimum 8 znaków.'
      );
    });

    it('should return error when password is 65 or more characters', () => {
      control.setValue(
        'passw012345678901234567890123456789012345678901234567890123456789'
      );
      const error = control.errors;
      expect(error?.passwordMaxLength).toBeDefined();
      expect(error?.passwordMaxLength.message).toBe(
        'Hasło musi mieć maksimum 64 znaków.'
      );
    });
  });
});

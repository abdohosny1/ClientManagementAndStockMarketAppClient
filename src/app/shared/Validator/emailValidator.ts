import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

export function emailValidator(): ValidatorFn {
  return (control: AbstractControl): Promise<ValidationErrors | null> => {
    return new Promise((resolve, reject) => {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const isValid = emailPattern.test(control.value);
      if (isValid) {
        resolve(null); // Email is valid
      } else {
        resolve({ 'invalidEmail': true }); // Email is invalid
      }
    });
  };
}

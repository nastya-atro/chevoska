import { FormArray, FormGroup } from '@angular/forms';

export default class Utils {
  constructor() {}

  static checkFormValidation(form: FormGroup) {
    Object.keys(form.controls).forEach(field => {
      const control = form.get(field);
      control && control.markAsTouched({ onlySelf: true });
      if (control instanceof FormArray) {
        control.controls.forEach(c => Utils.checkFormValidation(c as FormGroup));
      }
    });
  }
}

import { FormArray, FormGroup } from '@angular/forms';
import * as moment from 'moment';

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

  static localDateToUtcString(date: string, format?: string | undefined): string | null {
    return date ? moment(new Date(date)).utc().format(format) : null;
  }

  static utcDateStringToLocalString(date: string, format?: string | undefined): string | null {
    return date ? moment(new Date(date)).format(format) : null;
  }
}

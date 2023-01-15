import { AbstractControl, FormGroup } from '@angular/forms';

export interface IEnterViewStream {
  username: string;
  email: string;
  timezone: string;
  phone: string;
  key: string;
}

export interface EnterViewStreamFormGroup extends FormGroup {
  value: IEnterViewStream;

  controls: {
    username: AbstractControl;
    email: AbstractControl;
    timezone: AbstractControl;
    phone: AbstractControl;
    key: AbstractControl;
  };
}

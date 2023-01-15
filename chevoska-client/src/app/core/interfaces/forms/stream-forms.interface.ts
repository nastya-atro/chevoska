import { AbstractControl, FormGroup } from '@angular/forms';

export interface INewStream {
  title: string;
  description: string;
  keyWord: string;
  startDate: string;
  isPrivate: boolean;
}

export interface NewStreamFormGroup extends FormGroup {
  value: INewStream;

  controls: {
    title: AbstractControl;
    description: AbstractControl;
    startDate: AbstractControl;
    isPrivate: AbstractControl;
    keyWord: AbstractControl;
  };
}

export interface IEditStream {
  title: string;
  description: string;
  startDate: string;
  isPrivate: boolean;
}

export interface EditStreamFormGroup extends FormGroup {
  value: IEditStream;

  controls: {
    title: AbstractControl;
    description: AbstractControl;
    startDate: AbstractControl;
    isPrivate: AbstractControl;
  };
}

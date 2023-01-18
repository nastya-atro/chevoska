import { AbstractControl, FormControl, FormGroup } from '@angular/forms';

export interface INewStream {
  title: string;
  description: string;
  keyWord: string;
  startDate: string;
  isPrivate: boolean;

  banner: string;
  bannerCropSettings: string;
  originBanner: string;
  bannerFile: any;
}

export interface NewStreamFormGroup extends FormGroup {
  value: INewStream;

  controls: {
    title: AbstractControl;
    description: AbstractControl;
    startDate: AbstractControl;
    isPrivate: AbstractControl;
    keyWord: AbstractControl;

    banner: AbstractControl;
    bannerCropSettings: AbstractControl;
    originBanner: AbstractControl;
    bannerFile: AbstractControl;
  };
}

export interface IEditStream {
  title: string;
  description: string;
  startDate: string;
  isPrivate: boolean;

  banner: string;
  bannerCropSettings: string;
  originBanner: string;
  bannerFile: any;
}

export interface EditStreamFormGroup extends FormGroup {
  value: IEditStream;

  controls: {
    title: AbstractControl;
    description: AbstractControl;
    startDate: AbstractControl;
    isPrivate: AbstractControl;

    banner: AbstractControl;
    bannerCropSettings: AbstractControl;
    originBanner: AbstractControl;
    bannerFile: AbstractControl;
  };
}

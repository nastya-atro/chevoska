import { AbstractControl, FormGroup } from '@angular/forms';

interface IUserProfile {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  avatar: string;
}

export interface UserProfileFormGroup extends FormGroup {
  value: IUserProfile;

  controls: {
    firstName: AbstractControl;
    lastName: AbstractControl;
    phone: AbstractControl;
    email: AbstractControl;
    avatar: AbstractControl;
  };
}

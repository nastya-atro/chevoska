import { AbstractControl, FormGroup } from '@angular/forms';

interface IUserProfile {
  firstName: string;
  lastName: string;
  username: string;
  phone: string;
  email: string;
  avatar: string;
}

export interface UserProfileFormGroup extends FormGroup {
  value: IUserProfile;

  controls: {
    firstName: AbstractControl;
    lastName: AbstractControl;
    username: AbstractControl;
    phone: AbstractControl;
    email: AbstractControl;
    avatar: AbstractControl;
  };
}

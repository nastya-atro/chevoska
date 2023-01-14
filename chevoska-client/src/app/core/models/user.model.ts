export interface CreateUserRequest {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  phone: string;
  isAgreement: boolean;
}

export interface EditProfileRequest {
  firstName: string;
  lastName: string;
  emil: string;
  phone: string;
  avatar: string;
}

export interface CurrentUserResponse {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  phone: string;
  avatar: string;
  enabled: boolean;
  role: string;
}

export interface Profile {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  phone: string;
  avatar: string;
  enabled: boolean;
  role: string;
}

export interface ProfileResponse {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  phone: string;
  avatar: string;
  enabled: boolean;
  role: string;
}
// export default class ProfileUsage {
//   constructor(partial: Partial<ProfileResponse> = {}) {
//     Object.assign(this, partial);
//   }
//
//   static deserialize(partial: Partial<ProfileResponse>) {
//     return new ProfileUsage(partial);
//   }
// }

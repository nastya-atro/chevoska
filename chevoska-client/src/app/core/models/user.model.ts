import { StreamResponse } from './stream.model';

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
  email: string;
  phone: string;
  avatar: string;
}

export interface CurrentUser {
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

export interface CurrentUserResponse extends CurrentUser {}

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

export interface ProfileResponse extends Profile {}

export interface ProfileResolverData {
  profileComponentData: ProfileResponse;
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

export interface CurrentClientResponse {
  id: number;
  username: string;
  phone: string;
  timezone: string;
  email: string;
  stream: number;
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

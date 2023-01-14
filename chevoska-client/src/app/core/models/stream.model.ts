export interface CreateStreamRequest {
  title: string;
  description: string;
  keyWord: string;
  startDate: string;
  isPrivate: boolean;
}

export interface EditStreamRequest {
  title: string;
  description: string;
  startDate: string;
  isPrivate: boolean;
}

export interface StreamsList {
  id: number;
  title: string;
  description: string;
  private: boolean;
  startDate: string;
  enterLink: string;
  status: string;
}

export interface StreamsListResponse {
  id: number;
  title: string;
  description: string;
  private: boolean;
  startDate: string;
  enterLink: string;
  createDate: string;
  updateDate: string;
  downloadLink: string;
  enterKey: string;
  status: string;
}

export interface Stream {
  id: number;
  title: string;
  description: string;
  private: boolean;
  startDate: string;
  enterLink: string;
  createDate: string;
  updateDate: string;
  downloadLink: string;
  enterKey: string;
  streamStatus: string;
  //
  hrefLink: string;
}

export interface StreamResponse extends Stream {}

export interface StreamResolverData {
  streamComponentData: StreamResponse;
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

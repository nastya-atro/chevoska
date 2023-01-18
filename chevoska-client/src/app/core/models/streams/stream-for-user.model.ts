import { FormControl } from '@angular/forms';

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

export interface StreamsForUserList {
  id: number;
  title: string;
  private: boolean;
  startDate: string;
  status: string;
}

export interface StreamsForUserListResponse extends StreamsForUserList {}

export interface StreamForUser {
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
  banner: string;
  bannerCropSettings: any;
  originBanner: string;
  //
  hrefLink: string;
}

export interface StreamForUserResponse extends StreamForUser {}

export interface StreamForUserResolverData {
  streamComponentData: StreamForUserResponse;
}

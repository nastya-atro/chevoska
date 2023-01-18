export interface StreamsForClientList {
  id: number;
  title: string;
  description: string;
  private: boolean;
  startDate: string;
  streamStatus: string;
  banner: string;
}

export interface StreamsForClientListResponse extends StreamsForClientList {}

export interface StreamForClient {
  id: number;
  title: string;
  private: boolean;
  startDate: string;
  streamStatus: string;
  banner: string;
}

export interface StreamForClientResponse extends StreamForClient {}

export interface StreamForClientResolverData {
  streamComponentData: StreamForClientResponse;
}

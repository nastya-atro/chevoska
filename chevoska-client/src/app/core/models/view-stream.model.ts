import { StreamResponse } from './stream.model';
import { CurrentClient } from './client.model';

export interface EnterViewStreamRequest {
  username: string;
  email: string;
  phone?: string;
  key?: string;
}

export interface ViewStream {
  id: number;
  title: number;
  description: string;
  private: boolean;
  enterLink: string;
  startDate: string;
  streamStatus: string;
}

export interface viewStreamResolverData {
  viewStreamComponentData: {
    viewStream: ViewStream | null;
    client: CurrentClient | null;
  };
}

export interface ViewStreamResponse extends ViewStream {}

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

export interface ViewStreamResponse extends ViewStream {}

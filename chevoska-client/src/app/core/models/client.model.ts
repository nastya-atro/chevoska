export interface CurrentClient {
  id: number;
  username: string;
  phone: string;
  timezone: string;
  email: string;
  stream: number;
}

export interface CurrentClientResponse extends CurrentClient {}

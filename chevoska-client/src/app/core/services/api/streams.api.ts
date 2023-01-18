import { Injectable, OnDestroy } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApiService } from '../api.service';
import {
  CreateStreamRequest,
  EditStreamRequest,
  StreamForUserResponse,
  StreamsForUserListResponse,
} from '../../models/streams/stream-for-user.model';
import { ResponseListInterface } from '../../interfaces/payload-list.interface';
import { QueryParams } from '../../interfaces/query-params.interfaces';
import { StreamForClientResponse, StreamsForClientListResponse } from '../../models/streams/stream-for-client.model';
import Utils from '../../utils/utils';

@Injectable({
  providedIn: 'root',
})
export class StreamsApi implements OnDestroy {
  SEGMENT = '/streams';

  constructor(private api: ApiService) {}

  createStream(formData: FormData): Observable<unknown> {
    return this.api.post(`${this.SEGMENT}`, formData);
  }

  getMyStreams(params: QueryParams): Observable<ResponseListInterface<StreamsForUserListResponse>> {
    return this.api.get(`${this.SEGMENT}`, params);
  }

  getAllStreams(params: QueryParams): Observable<ResponseListInterface<StreamsForClientListResponse>> {
    return this.api.get(`${this.SEGMENT}/all`, params);
  }

  getStream(id: number): Observable<StreamForUserResponse> {
    return this.api.get(`${this.SEGMENT}/${id}`);
  }

  getStreamDetail(id: number): Observable<StreamForClientResponse> {
    return this.api.get(`${this.SEGMENT}/detail/${id}`);
  }

  sendEnterLinkRequest(email: string, id: number): Observable<unknown> {
    return this.api.post(`${this.SEGMENT}/detail/${id}`, { email });
  }

  generatePrivateKey(id: number): Observable<unknown> {
    return this.api.get(`${this.SEGMENT}/key/${id}`);
  }

  removeStream(id: number): Observable<unknown> {
    return this.api.delete(`${this.SEGMENT}/${id}`);
  }

  editStream(id: number, formData: FormData): Observable<unknown> {
    return this.api.put(`${this.SEGMENT}/${id}`, formData);
  }

  ngOnDestroy(): void {}
}

import { Injectable, OnDestroy } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApiService } from '../api.service';
import { CreateStreamRequest, EditStreamRequest, StreamResponse, StreamsListResponse } from '../../models/stream.model';
import { ResponseListInterface } from '../../interfaces/payload-list.interface';
import { QueryParams } from '../../interfaces/query-params.interfaces';

@Injectable({
  providedIn: 'root',
})
export class StreamsApi implements OnDestroy {
  SEGMENT = '/streams';

  constructor(private api: ApiService) {}

  createStream(stream: CreateStreamRequest): Observable<unknown> {
    return this.api.post(`${this.SEGMENT}`, stream);
  }

  getStreams(params: QueryParams): Observable<ResponseListInterface<StreamsListResponse>> {
    return this.api.get(`${this.SEGMENT}`, params);
  }

  getStream(id: number): Observable<StreamResponse> {
    return this.api.get(`${this.SEGMENT}/${id}`);
  }

  generatePrivateKey(id: number): Observable<unknown> {
    return this.api.get(`${this.SEGMENT}/key/${id}`);
  }

  removeStream(id: number): Observable<unknown> {
    return this.api.delete(`${this.SEGMENT}/${id}`);
  }

  editStream(id: number, newStreamData: EditStreamRequest): Observable<unknown> {
    return this.api.put(`${this.SEGMENT}/${id}`, newStreamData);
  }

  ngOnDestroy(): void {}
}

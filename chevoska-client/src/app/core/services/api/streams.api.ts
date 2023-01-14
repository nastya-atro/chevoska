import { Injectable, OnDestroy } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApiService } from '../api.service';
import { CreateStreamRequest, EditStreamRequest, StreamResponse, StreamsListResponse } from '../../models/stream.model';
import { ResponseListInterface } from '../../interfaces/payload-list.interface';

@Injectable({
  providedIn: 'root',
})
export class StreamsApi implements OnDestroy {
  constructor(private api: ApiService) {}

  createStream(stream: CreateStreamRequest): Observable<unknown> {
    return this.api.post(`/streams`, stream);
  }

  getStreams(params: any): Observable<ResponseListInterface<StreamsListResponse>> {
    return this.api.get(`/streams`, params);
  }

  getStream(id: number): Observable<StreamResponse> {
    return this.api.get(`/streams/${id}`);
  }

  generatePrivateKey(id: number): Observable<unknown> {
    return this.api.get(`/streams/key/${id}`);
  }

  removeStream(id: number): Observable<unknown> {
    return this.api.delete(`/streams/${id}`);
  }

  editStream(id: number, newStreamData: EditStreamRequest): Observable<unknown> {
    return this.api.put(`/streams/${id}`, newStreamData);
  }

  ngOnDestroy(): void {}
}

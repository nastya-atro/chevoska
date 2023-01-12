import { Injectable, OnDestroy } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root',
})
export class StreamsApi implements OnDestroy {
  constructor(private api: ApiService) {}

  createStream(stream: any): Observable<any> {
    return this.api.post(`/streams`, stream);
  }

  getStreams(params: any): Observable<any> {
    return this.api.get(`/streams`, params);
  }

  getStream(id: number): Observable<any> {
    return this.api.get(`/streams/${id}`);
  }

  generatePrivateKey(id: number): Observable<any> {
    return this.api.get(`/streams/key/${id}`);
  }

  removeStream(id: number): Observable<any> {
    return this.api.delete(`/streams/${id}`);
  }

  editStream(id: number, newStreamData: any): Observable<any> {
    return this.api.put(`/streams/${id}`, newStreamData);
  }

  ngOnDestroy(): void {}
}

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

  ngOnDestroy(): void {}
}

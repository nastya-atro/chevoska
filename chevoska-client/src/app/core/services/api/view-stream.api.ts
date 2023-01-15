import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';
import { UntilDestroy } from '@ngneat/until-destroy';
import { EnterViewStreamRequest, ViewStreamResponse } from '../../models/view-stream.model';

@UntilDestroy()
@Injectable({
  providedIn: 'root',
})
export class ViewStreamsApi implements OnDestroy {
  SEGMENT = '/streams/view';

  constructor(private api: ApiService) {}

  findStreamByEnterLink(enterLink: string): Observable<ViewStreamResponse> {
    return this.api.get(`${this.SEGMENT}/${enterLink}`);
  }

  enterSystem(data: EnterViewStreamRequest, streamId: number): Observable<unknown> {
    return this.api.post(`${this.SEGMENT}/enter/${streamId}`, data);
  }

  ngOnDestroy(): void {}
}

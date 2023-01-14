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
  constructor(private api: ApiService) {}

  findStreamByEnterLink(enterLink: string): Observable<ViewStreamResponse> {
    return this.api.get(`/streams/view/${enterLink}`);
  }

  enterSystem(data: EnterViewStreamRequest, streamId: number) {
    return this.api.post(`/streams/view/enter/${streamId}`, data);
  }

  ngOnDestroy(): void {}
}

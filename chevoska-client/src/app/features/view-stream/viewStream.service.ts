import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';
import { ViewStreamsApi } from '../../core/services/api/view-stream.api';

@UntilDestroy()
@Injectable({
  providedIn: 'root',
})
export class ViewStreamService implements OnDestroy {
  constructor(private router: Router, private viewStreamApi: ViewStreamsApi) {}

  ngOnDestroy(): void {}

  enterSystem(data: any, streamId: number) {
    return this.viewStreamApi.enterSystem(data, streamId);
  }

  findCurrentClient(id: number) {
    return this.viewStreamApi.findCurrentClient(id);
  }
}

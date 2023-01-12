import { Component } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ViewStreamService } from '../viewStream.service';
import { ViewStreamsApi } from '../../../core/services/api/view-stream.api';

@UntilDestroy()
@Component({
  selector: 'app-active-stream',
  templateUrl: './activeStream.component.html',
  styleUrls: ['./activeStream.component.scss'],
})
export class ActiveStreamComponent {
  user!: any;
  stream!: any;
  constructor(private viewStreamService: ViewStreamService, private viewStream: ViewStreamsApi) {
    const clientId = localStorage.getItem('stream_view_user');
    if (clientId) {
      viewStreamService
        .findCurrentClient(Number(clientId))
        .pipe(untilDestroyed(this))
        .subscribe({
          next: result => {
            this.user = result;
          },
          error: () => {},
        });
    }
    this.stream = this.viewStream.stream;
  }
}

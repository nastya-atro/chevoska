import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ActivatedRoute } from '@angular/router';
import { NotifyService } from '../../../shared/modules/notifications/notify.service';
import { Clipboard } from '@angular/cdk/clipboard';
import { transition, trigger, useAnimation } from '@angular/animations';
import { fadeIn } from 'ng-animate';
import { MainPageService } from '../main-page.service';
import { StreamForClient, StreamForClientResolverData } from '../../../core/models/streams/stream-for-client.model';

@UntilDestroy()
@Component({
  selector: 'app-main-stream-detail',
  templateUrl: './main-stream-detail.component.html',
  styleUrls: ['./main-stream-detail.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(
        '* => *',
        useAnimation(fadeIn, {
          params: { timing: 0.4, delay: 0 },
        })
      ),
    ]),
  ],
})
export class MainStreamDetailComponent implements OnInit {
  stream!: StreamForClient;
  loading = false;

  constructor(
    private clipboard: Clipboard,
    private mainService: MainPageService,
    private activatedRoute: ActivatedRoute,
    private notifyService: NotifyService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.pipe(untilDestroyed(this)).subscribe({
      next: data => {
        const streamData = (data as StreamForClientResolverData)?.streamComponentData || null;
        if (streamData) {
          this.stream = {
            ...streamData,
          };
        }
      },
      error: () => {},
    });
  }

  requestLink() {}
}

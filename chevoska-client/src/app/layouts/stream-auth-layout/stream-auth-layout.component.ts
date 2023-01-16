import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AuthenticationService } from '../../features/authentication/authentication.service';
import { ViewStreamService } from '../../features/view-stream/viewStream.service';
import { ViewStream, viewStreamResolverData } from '../../core/models/view-stream.model';
import { transition, trigger, useAnimation } from '@angular/animations';
import { fadeIn } from 'ng-animate';

@UntilDestroy()
@Component({
  selector: 'app-stream-auth-layout',
  templateUrl: './stream-auth-layout.component.html',
  styleUrls: ['./stream-auth-layout.component.scss'],
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
export class StreamAuthLayoutComponent {
  stream!: ViewStream | null;
  rootPath!: string;
  isUserActiveInStream!: boolean;

  constructor(
    private viewStreamService: ViewStreamService,
    private authService: AuthenticationService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.data.pipe(untilDestroyed(this)).subscribe({
      next: data => {
        const viewStreamData = (data as viewStreamResolverData)?.viewStreamComponentData || null;
        if (viewStreamData) {
          this.stream = viewStreamData.viewStream;
          if (viewStreamData.client && this.stream) {
            this.isUserActiveInStream = viewStreamData.client.stream === this.stream.id;
          }
        }
      },
    });
  }

  logout() {
    this.authService.logout();
  }
}

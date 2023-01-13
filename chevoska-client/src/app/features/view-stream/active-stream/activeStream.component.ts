import { Component } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { ViewStreamService } from '../viewStream.service';
import { ViewStreamsApi } from '../../../core/services/api/view-stream.api';
import { AuthenticationService } from '../../authentication/authentication.service';

@UntilDestroy()
@Component({
  selector: 'app-active-stream',
  templateUrl: './activeStream.component.html',
  styleUrls: ['./activeStream.component.scss'],
})
export class ActiveStreamComponent {
  user!: any;
  stream!: any;
  constructor(
    private viewStreamService: ViewStreamService,
    private authService: AuthenticationService,
    private viewStreamApi: ViewStreamsApi
  ) {
    this.user = this.authService.getCurrentClient();
    this.stream = this.viewStreamApi.stream;
  }
}

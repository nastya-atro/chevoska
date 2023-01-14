import { Component } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { ViewStreamService } from '../viewStream.service';
import { AuthenticationService } from '../../authentication/authentication.service';
import { CurrentUserResponse } from '../../../core/models/user.model';
import { CurrentClientResponse } from '../../../core/models/client.model';
import { ViewStream } from '../../../core/models/view-stream.model';

@UntilDestroy()
@Component({
  selector: 'app-active-stream',
  templateUrl: './activeStream.component.html',
  styleUrls: ['./activeStream.component.scss'],
})
export class ActiveStreamComponent {
  user!: CurrentUserResponse | null;
  client!: CurrentClientResponse | null;
  stream!: ViewStream;
  constructor(private authService: AuthenticationService, private viewStreamService: ViewStreamService) {
    this.client = this.viewStreamService.getCurrentClient();
    this.user = this.authService.getCurrentUser();

    this.stream = this.viewStreamService.stream;
  }

  logout() {
    this.authService.logout();
  }
}

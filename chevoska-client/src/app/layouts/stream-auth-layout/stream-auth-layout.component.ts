import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';
import { AuthenticationService } from '../../features/authentication/authentication.service';
import { ViewStreamService } from '../../features/view-stream/viewStream.service';
import { ViewStream } from '../../core/models/view-stream.model';
import { CurrentUserResponse } from '../../core/models/user.model';

@UntilDestroy()
@Component({
  selector: 'app-stream-auth-layout',
  templateUrl: './stream-auth-layout.component.html',
  styleUrls: ['./stream-auth-layout.component.scss'],
})
export class StreamAuthLayoutComponent {
  stream!: ViewStream;
  user!: CurrentUserResponse | null;
  rootPath!: string;
  isUserActiveInStream!: boolean;

  constructor(
    private router: Router,
    private viewStreamService: ViewStreamService,
    private authService: AuthenticationService
  ) {
    const isClientSessionSave = this.viewStreamService.isClientSessionSave();
    const isClientSessionToCurrentStream =
      this.viewStreamService.getCurrentClient()?.stream === this.viewStreamService.stream?.id;
    this.user = this.authService.getCurrentUser();
    this.isUserActiveInStream = isClientSessionSave && isClientSessionToCurrentStream;

    this.stream = this.viewStreamService.stream;
  }

  logout() {
    this.authService.logout();
  }
}

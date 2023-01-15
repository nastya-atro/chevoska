import { Component } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { ViewStreamService } from '../viewStream.service';
import { AuthenticationService } from '../../authentication/authentication.service';
import { CurrentUser } from '../../../core/models/user.model';
import { CurrentClient } from '../../../core/models/client.model';
import { ViewStream } from '../../../core/models/view-stream.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.state';
import { selectUser } from '../../../store/app.selectors';

@UntilDestroy()
@Component({
  selector: 'app-active-stream',
  templateUrl: './activeStream.component.html',
  styleUrls: ['./activeStream.component.scss'],
})
export class ActiveStreamComponent {
  user$: Observable<CurrentUser | null> = this.store.select(selectUser);
  client!: CurrentClient | null;
  stream!: ViewStream;
  constructor(
    private authService: AuthenticationService,
    private viewStreamService: ViewStreamService,
    private store: Store<AppState>
  ) {
    this.client = this.viewStreamService.getCurrentClient();
    this.stream = this.viewStreamService.stream;
  }

  logout() {
    this.authService.logout();
  }
}

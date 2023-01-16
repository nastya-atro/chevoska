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
import { selectClient, selectUser, selectViewStream } from '../../../store/app.selectors';

@UntilDestroy()
@Component({
  selector: 'app-active-stream',
  templateUrl: './activeStream.component.html',
  styleUrls: ['./activeStream.component.scss'],
})
export class ActiveStreamComponent {
  user$: Observable<CurrentUser | null> = this.store.select(selectUser);
  client$: Observable<CurrentClient | null> = this.store.select(selectClient);
  viewStream$: Observable<ViewStream | null> = this.store.select(selectViewStream);

  constructor(
    private authService: AuthenticationService,
    private viewStreamService: ViewStreamService,
    private store: Store<AppState>
  ) {}

  logout() {
    this.authService.logout();
  }
}

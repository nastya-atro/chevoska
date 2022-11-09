import { Component, HostListener } from '@angular/core';
import { AuthApi } from '../../core/services/api/auth.api';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AuthenticationService } from '../../features/authentication/authentication.service';

@UntilDestroy()
@Component({
  selector: 'domain-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent {
  constructor(private authService: AuthenticationService) {}

  logout() {
    this.authService.logout();
  }
}

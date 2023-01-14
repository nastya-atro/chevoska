import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../../features/authentication/authentication.service';
import { ViewStreamService } from '../../features/view-stream/viewStream.service';

@Injectable({ providedIn: 'root' })
export class ClientAccessGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private viewStreamService: ViewStreamService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isClientSessionSave = this.viewStreamService.isClientSessionSave();
    const isClientSessionToCurrentStream =
      this.viewStreamService.getCurrentClient()?.stream === this.viewStreamService.stream?.id;
    if (isClientSessionSave && isClientSessionToCurrentStream) {
      return this.router.navigate([`${this.viewStreamService.rootPath}/active`]);
    } else {
      return !(isClientSessionSave && isClientSessionToCurrentStream);
    }
  }
}

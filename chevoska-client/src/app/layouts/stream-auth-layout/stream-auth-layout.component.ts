import { Component, OnInit } from '@angular/core';
import * as qs from 'qs';
import { ViewStreamsApi } from '../../core/services/api/view-stream.api';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-stream-auth-layout',
  templateUrl: './stream-auth-layout.component.html',
  styleUrls: ['./stream-auth-layout.component.scss'],
})
export class StreamAuthLayoutComponent {
  stream!: any;
  rootPath!: string;
  constructor(private router: Router, private viewStream: ViewStreamsApi, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe(({ key }) => {
      if (key) {
        this.viewStream
          .findStreamByEnterLink(key)
          .pipe(untilDestroyed(this))
          .subscribe({
            next: result => {
              this.stream = result;
              this.rootPath = `/stream/${result.enterLink}`;
              if (localStorage.getItem('stream_view_user')) {
                this.router.navigate([`${this.rootPath}/active`]);
              } else {
                this.router.navigate([`${this.rootPath}/enter`]);
              }
            },
          });
      }
    });
  }
}

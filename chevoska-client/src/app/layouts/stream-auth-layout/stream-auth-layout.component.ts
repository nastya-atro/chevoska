import { Component } from '@angular/core';
import { ViewStreamsApi } from '../../core/services/api/view-stream.api';
import { Router } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-stream-auth-layout',
  templateUrl: './stream-auth-layout.component.html',
  styleUrls: ['./stream-auth-layout.component.scss'],
})
export class StreamAuthLayoutComponent {
  stream!: any;
  rootPath!: string;
  constructor(private router: Router, private viewStream: ViewStreamsApi) {
    this.stream = this.viewStream.stream;
  }
}

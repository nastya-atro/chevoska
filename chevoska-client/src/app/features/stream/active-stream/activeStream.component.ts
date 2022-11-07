import { Component } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
@UntilDestroy()
@Component({
  selector: 'app-active-stream',
  templateUrl: './activeStream.component.html',
  styleUrls: ['./activeStream.component.scss'],
})
export class ActiveStreamComponent {
  constructor() {}
}

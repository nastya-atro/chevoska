import { Component } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
@UntilDestroy()
@Component({
  selector: 'app-streams',
  templateUrl: './streams.component.html',
  styleUrls: ['./streams.component.scss'],
})
export class StreamsComponent {
  constructor() {}
}

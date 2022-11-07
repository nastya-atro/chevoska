import { Component } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
@UntilDestroy()
@Component({
  selector: 'app-stream-statistic',
  templateUrl: './statisticStream.component.html',
  styleUrls: ['./statisticStream.component.scss'],
})
export class StatisticStreamComponent {
  constructor() {}
}

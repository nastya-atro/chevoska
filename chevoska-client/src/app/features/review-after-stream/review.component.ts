import { Component } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
@UntilDestroy()
@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss'],
})
export class ReviewComponent {
  constructor() {}
}

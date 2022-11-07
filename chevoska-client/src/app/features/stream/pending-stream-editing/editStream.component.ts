import { Component } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
@UntilDestroy()
@Component({
  selector: 'app-edit-stream',
  templateUrl: './editStream.component.html',
  styleUrls: ['./editStream.component.scss'],
})
export class EditStreamComponent {
  constructor() {}
}

import { Component } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
@UntilDestroy()
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  constructor() {}
}

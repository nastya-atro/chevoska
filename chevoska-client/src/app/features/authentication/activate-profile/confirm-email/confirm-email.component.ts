import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.scss'],
})
export class ConfirmEmailComponent {
  email: null | string = null;
  constructor(private router: Router) {
    if (window.history.state.email) {
      this.email = window.history.state.email;
    }
  }
}

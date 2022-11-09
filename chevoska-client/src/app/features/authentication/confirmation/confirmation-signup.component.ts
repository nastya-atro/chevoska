import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation-signup.component.html',
  styleUrls: ['./confirmation-signup.component.scss'],
})
export class ConfirmationSignupComponent implements OnInit {
  confirmationError = false;

  constructor(private router: Router, private authService: AuthenticationService) {}

  ngOnInit(): void {
    this.authService.activateProfile(this.router.parseUrl(this.router.url).queryParams['token']).subscribe({
      next: () => {},
      error: () => {
        this.confirmationError = true;
      },
    });
  }
}

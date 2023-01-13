import { Component } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewStreamService } from '../viewStream.service';
import Utils from '../../../core/utils/utils';
import { ViewStreamsApi } from '../../../core/services/api/view-stream.api';
import { AuthenticationService } from '../../authentication/authentication.service';

@UntilDestroy()
@Component({
  selector: 'app-enter-system',
  templateUrl: './enterSystem.component.html',
  styleUrls: ['./enterSystem.component.scss'],
})
export class EnterSystemComponent {
  myForm: FormGroup;
  stream!: any;

  constructor(
    private viewStream: ViewStreamsApi,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private viewStreamService: ViewStreamService,
    private authService: AuthenticationService
  ) {
    this.stream = this.viewStream.stream;
    this.myForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('^(\\s+)?[a-zA-Z0-9+._-]+@[a-zA-Z0-9-]+[.]{1}[a-zA-Z]{2,4}([.]{1}[a-zA-Z]{2,4})?(\\s+)?$'),
          Validators.maxLength(80),
        ],
      ],
      timezone: [''],
      phone: ['', [Validators.pattern('^[+]*[-\\s\\./0-9]*$')]],
      key: [''],
    });

    if (this.stream.private) {
      this.myForm.controls['key'].setValidators([Validators.required]);
      this.myForm.controls['key'].updateValueAndValidity();
    }
  }

  submit(): void {
    if (this.myForm.valid) {
      this.viewStreamService
        .enterSystem(this.myForm.value, this.stream.id)
        .pipe(untilDestroyed(this))
        .subscribe({
          next: res => {
            this.authService
              .findCurrentClient()
              .pipe(untilDestroyed(this))
              .subscribe(() => this.router.navigate([`${this.viewStream.rootPath}/active`]));
          },
          error: () => {},
        });
    } else {
      Utils.checkFormValidation(this.myForm);
    }
  }
}

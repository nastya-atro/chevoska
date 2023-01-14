import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewStreamService } from '../viewStream.service';
import Utils from '../../../core/utils/utils';
import { AuthenticationService } from '../../authentication/authentication.service';
import { DateCountDownService } from '../../../shared/components/date-count-down/date-count-down.service';
import { CurrentClientResponse } from '../../../core/models/client.model';
import { CurrentUserResponse } from '../../../core/models/user.model';
import { ViewStream } from '../../../core/models/view-stream.model';

@UntilDestroy()
@Component({
  selector: 'app-enter-system',
  templateUrl: './enterSystem.component.html',
  styleUrls: ['./enterSystem.component.scss'],
})
export class EnterSystemComponent {
  myForm: FormGroup;
  stream!: ViewStream;
  client!: CurrentClientResponse | null;
  user!: CurrentUserResponse | null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private viewStreamService: ViewStreamService,
    private authService: AuthenticationService,
    private dateCountDownService: DateCountDownService
  ) {
    this.stream = this.viewStreamService.stream;
    this.myForm = this.formBuilder.group({
      username: [this.user?.firstName || this.client?.username || '', [Validators.required]],
      email: [
        this.user?.email || this.client?.email || '',
        [
          Validators.required,
          Validators.pattern('^(\\s+)?[a-zA-Z0-9+._-]+@[a-zA-Z0-9-]+[.]{1}[a-zA-Z]{2,4}([.]{1}[a-zA-Z]{2,4})?(\\s+)?$'),
          Validators.maxLength(80),
        ],
      ],
      timezone: [''],
      phone: [this.user?.phone || this.client?.phone || '', [Validators.pattern('^[+]*[-\\s\\./0-9]*$')]],
      key: [''],
    });

    if (this.stream.private) {
      this.myForm.controls['key'].setValidators([Validators.required]);
      this.myForm.controls['key'].updateValueAndValidity();
    }
    this.dateCountDownService.setInitialValue(this.firstAvailableValue() && !this.isStreamStarted);
    this.firstAvailableValue() && !this.isStreamStarted && this.myForm.disable();
  }

  get isStreamEnterAvailable() {
    this.dateCountDownService.isStreamEnterAvailable && this.myForm.enable();
    return this.dateCountDownService.isStreamEnterAvailable;
  }

  get isStreamStarted() {
    return this.dateCountDownService.isStreamStarted;
  }

  firstAvailableValue() {
    return new Date(this.stream.startDate).getTime() - new Date().getTime() > 21600000;
  }

  submit(): void {
    if (this.myForm.valid) {
      this.viewStreamService
        .enterSystem(this.myForm.value, this.stream.id)
        .pipe(untilDestroyed(this))
        .subscribe({
          next: res => {
            this.viewStreamService
              .findCurrentClient()
              .pipe(untilDestroyed(this))
              .subscribe(() => this.router.navigate([`${this.viewStreamService.rootPath}/active`]));
          },
          error: () => {},
        });
    } else {
      Utils.checkFormValidation(this.myForm);
    }
  }
}

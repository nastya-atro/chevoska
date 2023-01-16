import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewStreamService } from '../viewStream.service';
import Utils from '../../../core/utils/utils';
import { AuthenticationService } from '../../authentication/authentication.service';
import { DateCountDownService } from '../../../shared/modules/date-count-down/date-count-down.service';
import { CurrentClient } from '../../../core/models/client.model';
import { CurrentUser } from '../../../core/models/user.model';
import { ViewStream, viewStreamResolverData } from '../../../core/models/view-stream.model';
import { EnterViewStreamFormGroup } from '../../../core/interfaces/forms/view-stream-forms.interface';
import { Observable } from 'rxjs';
import { selectUser } from '../../../store/app.selectors';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.state';

@UntilDestroy()
@Component({
  selector: 'app-enter-system',
  templateUrl: './enterSystem.component.html',
  styleUrls: ['./enterSystem.component.scss'],
})
export class EnterSystemComponent implements OnInit {
  user$: Observable<CurrentUser | null> = this.store.select(selectUser);
  stream!: ViewStream;
  client!: CurrentClient | null;

  form: EnterViewStreamFormGroup = this.formBuilder.group({
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
  }) as EnterViewStreamFormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private viewStreamService: ViewStreamService,
    private authService: AuthenticationService,
    private dateCountDownService: DateCountDownService,
    private store: Store<AppState>
  ) {
    this.activatedRoute.parent?.data.pipe(untilDestroyed(this)).subscribe({
      next: data => {
        const viewStreamData = (data as viewStreamResolverData)?.viewStreamComponentData || null;
        if (viewStreamData) {
          this.stream = viewStreamData.viewStream as any;
          this.client = viewStreamData.client;
        }
      },
    });
  }

  ngOnInit() {
    this.user$.pipe(untilDestroyed(this)).subscribe(user => {
      this.form.patchValue({
        username: user?.username || this.client?.username || '',
        email: user?.email || this.client?.email || '',
        phone: user?.phone || this.client?.phone || '',
      });
    });

    this.dateCountDownService.setInitialValue(this.firstAvailableValue() && !this.isStreamStarted);
    if (this.firstAvailableValue() && !this.isStreamStarted) {
      this.form.disable();
    }

    if (this.stream?.private) {
      this.form.controls.key.setValidators([Validators.required]);
      this.form.controls.key.updateValueAndValidity();
    }
  }

  get isStreamEnterAvailable() {
    this.dateCountDownService.isStreamEnterAvailable && this.form.enable();
    return this.dateCountDownService.isStreamEnterAvailable;
  }

  get isStreamStarted() {
    return this.dateCountDownService.isStreamStarted;
  }

  firstAvailableValue() {
    return new Date(this.stream.startDate).getTime() - new Date().getTime() > 21600000;
  }

  submit(): void {
    if (this.form.valid) {
      this.viewStreamService
        .enterSystem(this.form.value, this.stream.id)
        .pipe(untilDestroyed(this))
        .subscribe({
          next: res => {
            this.viewStreamService
              .findCurrentClient()
              .pipe(untilDestroyed(this))
              .subscribe(() => {
                this.router.navigate([`${this.viewStreamService.rootViewStreamPath}/active`]);
              });
          },
          error: () => {},
        });
    } else {
      Utils.checkFormValidation(this.form);
    }
  }
}

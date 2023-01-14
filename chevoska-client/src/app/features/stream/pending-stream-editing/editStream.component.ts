import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IDatePickerDirectiveConfig } from 'ng2-date-picker';
import Utils from '../../../core/utils/utils';
import { NotifyService } from '../../../shared/modules/notifications/notify.service';
import { Clipboard } from '@angular/cdk/clipboard';
import { StreamService } from '../stream.service';
import { Stream, StreamResolverData } from '../../../core/models/stream.model';

@UntilDestroy()
@Component({
  selector: 'app-edit-stream',
  templateUrl: './editStream.component.html',
  styleUrls: ['./editStream.component.scss', '../datePicker.styles.scss'],
})
export class EditStreamComponent implements OnInit {
  readonly dateForat: string = 'YYYY-MM-DD HH:mm:ss';

  dayPickerconfig: IDatePickerDirectiveConfig = {
    enableMonthSelector: false,
    showNearMonthDays: false,
    format: this.dateForat,
    weekDayFormat: 'dd',
    showGoToCurrent: false,
    monthFormat: 'MMMM YYYY',
    disableKeypress: true,
  };
  id!: number;
  stream!: Stream;
  loading = false;

  form: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.maxLength(80)]),
    description: new FormControl('', [Validators.required, Validators.maxLength(80)]),
    startDate: new FormControl('', [Validators.required, Validators.maxLength(80)]),
    isPrivate: new FormControl(false),
  });

  constructor(
    private clipboard: Clipboard,
    private streamService: StreamService,
    private activatedRoute: ActivatedRoute,
    private notifyService: NotifyService
  ) {
    this.activatedRoute.params.subscribe(({ id: idQuery }) => {
      if (idQuery) {
        this.id = Number(idQuery);
      }
    });
  }

  ngOnInit(): void {
    this.activatedRoute.data.pipe(untilDestroyed(this)).subscribe({
      next: data => {
        const streamData = (data as StreamResolverData)?.streamComponentData || null;
        if (streamData) {
          this.stream = {
            ...streamData,
            enterLink: `${window.location.host}/stream/${streamData.enterLink}`,
            hrefLink: `/stream/${streamData.enterLink}`,
          };
          this.form.patchValue({
            title: this.stream.title,
            description: this.stream.description,
            startDate: Utils.utcDateStringToLocalString(this.stream.startDate, this.dateForat),
            isPrivate: this.stream.private,
          });
        }
      },
      error: () => {},
    });
  }

  loadStream() {
    this.streamService
      .getStream(this.id)
      .pipe(
        untilDestroyed(this),
        finalize(() => (this.loading = false))
      )
      .subscribe(result => {
        this.form.patchValue({
          title: result.title,
          description: result.description,
          startDate: Utils.utcDateStringToLocalString(result.startDate, this.dateForat),
          isPrivate: result.private,
        });
        this.stream = {
          ...result,
          enterLink: `${window.location.host}/stream/${result.enterLink}`,
          hrefLink: `/stream/${result.enterLink}`,
        };
      });
  }

  generateKey() {
    this.streamService
      .generatePrivateKey(this.id)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: () => {
          this.notifyService.notifier.success('Private Key generated success');
          this.loadStream();
        },
        error: () => {},
      });
  }

  editStream() {
    if (this.id) {
      if (this.form.valid) {
        const data = {
          ...this.form.value,
          // startDate: Utils.localDateToUtcString(this.form.get('startDate')?.value, this.dateForat),
        };
        this.streamService
          .editStream(this.id, data)
          .pipe(
            untilDestroyed(this),
            finalize(() => (this.loading = false))
          )
          .subscribe({
            next: () => {
              this.loadStream();
              this.notifyService.notifier.success('Stream edit success');
            },
            error: () => {},
          });
      } else {
        Utils.checkFormValidation(this.form);
      }
    }
  }

  dateIntervalChange() {
    this.form.get('startDate')?.updateValueAndValidity();
  }

  copyToClipboard(text: string) {
    this.clipboard.copy(text);
    this.notifyService.notifier.success('Copied to clipboard success');
  }
}

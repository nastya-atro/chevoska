import { Component } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IDatePickerDirectiveConfig } from 'ng2-date-picker';
import { AddNewStreamService } from './addNewStream.service';
import { NotifyService } from '../../shared/modules/notifications/notify.service';
import Utils from '../../core/utils/utils';

@UntilDestroy()
@Component({
  selector: 'app-new-stream-stream',
  templateUrl: './addNewStream.component.html',
  styleUrls: ['./addNewStream.component.scss', './datePicker.styles.scss'],
})
export class AddNewStreamComponent {
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

  form: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.maxLength(80)]),
    description: new FormControl('', [Validators.required, Validators.maxLength(80)]),
    startDate: new FormControl('', [Validators.required, Validators.maxLength(80)]),
    isPrivate: new FormControl(false),
    keyWord: new FormControl('', [Validators.required, Validators.maxLength(20)]),
  });

  constructor(private streamsService: AddNewStreamService, private notifyService: NotifyService) {}

  createStream() {
    const data = {
      ...this.form.value,
      startDate: Utils.localDateToUtcString(this.form.get('startDate')?.value, this.dateForat),
    };
    this.streamsService
      .createStream(data)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: () => {
          this.notifyService.notifier.success('Stream created success');
        },
        error: () => {},
      });
  }

  dateIntervalChange() {
    this.form.get('startDate')?.updateValueAndValidity();
  }
}

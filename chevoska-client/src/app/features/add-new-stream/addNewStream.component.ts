import { Component } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IDatePickerDirectiveConfig } from 'ng2-date-picker';

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

  constructor() {}

  dateIntervalChange() {
    this.form.get('startDate')?.updateValueAndValidity();
  }
}

import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { EditStreamService } from './editStream.service';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IDatePickerDirectiveConfig } from 'ng2-date-picker';
import Utils from '../../../core/utils/utils';
@UntilDestroy()
@Component({
  selector: 'app-edit-stream',
  templateUrl: './editStream.component.html',
  styleUrls: ['./editStream.component.scss', './datePicker.styles.scss'],
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
  stream!: any;
  loading = false;

  form: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.maxLength(80)]),
    description: new FormControl('', [Validators.required, Validators.maxLength(80)]),
    startDate: new FormControl('', [Validators.required, Validators.maxLength(80)]),
    isPrivate: new FormControl(false),
    keyWord: new FormControl('', [Validators.required, Validators.maxLength(20)]),
  });

  constructor(private editStreamService: EditStreamService, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe(({ id: idQuery }) => {
      if (idQuery) {
        this.id = Number(idQuery);
      }
    });
  }

  ngOnInit(): void {
    if (this.id) {
      this.editStreamService
        .getStream(this.id)
        .pipe(
          untilDestroyed(this),
          finalize(() => (this.loading = false))
        )
        .subscribe((result: any) => {
          this.form.patchValue({
            title: result.title,
            description: result.title,
            startDate: Utils.utcDateStringToLocalString(result.startDate, this.dateForat),
            isPrivate: result.private,
          });
          this.stream = result;
        });
    }
  }

  editStream() {}

  dateIntervalChange() {
    this.form.get('startDate')?.updateValueAndValidity();
  }
}

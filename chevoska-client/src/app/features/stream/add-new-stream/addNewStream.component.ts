import { Component } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { IDatePickerDirectiveConfig } from 'ng2-date-picker';
import { StreamService } from '../stream.service';
import { NotifyService } from '../../../shared/modules/notifications/notify.service';
import Utils from '../../../core/utils/utils';
import { Router } from '@angular/router';
import { NewStreamFormGroup } from '../../../core/interfaces/forms/stream-forms.interface';
import { TextEditorService } from '../../../shared/modules/text-editor/text-editor.service';
import { CroppedState } from '../../../shared/directives/image-upload/image-upload.component';
import { transition, trigger, useAnimation } from '@angular/animations';
import { fadeIn } from 'ng-animate';

@UntilDestroy()
@Component({
  selector: 'app-new-stream-stream',
  templateUrl: './addNewStream.component.html',
  styleUrls: ['./addNewStream.component.scss', '../datePicker.styles.scss'],
  animations: [
    trigger('fadeIn', [
      transition(
        '* => *',
        useAnimation(fadeIn, {
          params: { timing: 0.4, delay: 0 },
        })
      ),
    ]),
  ],
})
export class AddNewStreamComponent {
  form: NewStreamFormGroup;

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
  quillConfig!: {};

  displayBannerError: ValidatorFn = (): ValidationErrors | null => {
    if (this.form?.controls.bannerFile.value || this.form?.controls.originBanner.value) {
      console.log(this.form?.controls.bannerFile.value || this.form?.controls.originBanner.value);
      return null;
    } else {
      console.log(this.form?.controls.bannerFile.value || this.form?.controls.originBanner.value);

      return { rangeError: true };
    }
  };

  constructor(
    private streamsService: StreamService,
    private notifyService: NotifyService,
    private router: Router,
    private textEditorService: TextEditorService
  ) {
    this.quillConfig = textEditorService.quillConfig;

    this.form = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.maxLength(80)]),
      description: new FormControl('', [Validators.required]),
      startDate: new FormControl('', [Validators.required, Validators.maxLength(80)]),
      isPrivate: new FormControl(false),
      keyWord: new FormControl('', [Validators.required, Validators.maxLength(20)]),

      banner: new FormControl(''),
      bannerCropSettings: new FormControl(''),
      originBanner: new FormControl('', this.displayBannerError),
      bannerFile: new FormControl(null),
      croppedBannerFile: new FormControl(null),
    }) as NewStreamFormGroup;
  }

  createStream() {
    if (this.form.valid) {
      const data = {
        title: this.form.controls.title.value,
        description: this.form.controls.description.value,
        isPrivate: this.form.controls.isPrivate.value,
        keyWord: this.form.controls.keyWord.value,
        banner: this.form.controls.banner.value,
        bannerCropSettings: this.form.controls.bannerCropSettings.value,
        originBanner: this.form.controls.originBanner.value,
        startDate: Utils.localDateToUtcString(this.form.controls.startDate.value, this.dateForat),
      };
      const formData = new FormData();
      this.form.get('bannerFile')?.value && formData.append('bannerFile', this.form.get('bannerFile')?.value);
      this.form.get('croppedBannerFile')?.value &&
        formData.append('croppedBannerFile', this.form.get('croppedBannerFile')?.value);
      formData.append('stream', JSON.stringify({ ...data }));

      this.streamsService
        .createStream(formData)
        .pipe(untilDestroyed(this))
        .subscribe({
          next: res => {
            this.router.navigate([`/edit/${res.streamId}`]);
            this.notifyService.notifier.success('Stream created success');
          },
          error: () => {},
        });
    } else {
      console.log(this.form.controls.originBanner.invalid);
      Utils.checkFormValidation(this.form);
    }
  }

  dateIntervalChange() {
    this.form.controls.startDate.updateValueAndValidity();
  }

  onUploadBackgroundFinished({ file }: { file: File; type: string }) {
    this.form.patchValue({
      originBanner: '',
      bannerFile: file,
    });
  }

  setCroppedBackgroundState({ file, position }: CroppedState) {
    this.form.patchValue({
      bannerCropSettings: position,
      croppedBannerFile: file,
      banner: '',
    });
  }

  resetBackgroundImage() {
    this.form.patchValue({
      croppedBannerFile: null,
      bannerFile: null,
      originBanner: null,
      bannerCropSettings: null,
      banner: null,
    });
  }

  onEditorCreated(quill: any) {
    quill.format('color', '#ffffff');
  }
}

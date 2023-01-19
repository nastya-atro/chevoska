import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs';
import { FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { IDatePickerDirectiveConfig } from 'ng2-date-picker';
import Utils from '../../../core/utils/utils';
import { NotifyService } from '../../../shared/modules/notifications/notify.service';
import { Clipboard } from '@angular/cdk/clipboard';
import { StreamService } from '../stream.service';
import { StreamForUser, StreamForUserResolverData } from '../../../core/models/streams/stream-for-user.model';
import { EditStreamFormGroup } from '../../../core/interfaces/forms/stream-forms.interface';
import { transition, trigger, useAnimation } from '@angular/animations';
import { fadeIn } from 'ng-animate';
import { TextEditorService } from '../../../shared/modules/text-editor/text-editor.service';
import { CroppedState } from '../../../shared/directives/image-upload/image-upload.component';

@UntilDestroy()
@Component({
  selector: 'app-edit-stream',
  templateUrl: './editStream.component.html',
  styleUrls: ['./editStream.component.scss', '../datePicker.styles.scss'],
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
export class EditStreamComponent implements OnInit {
  id!: number;
  stream!: StreamForUser;
  form: EditStreamFormGroup;
  loading = false;

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
      return null;
    } else {
      return { rangeError: true };
    }
  };

  constructor(
    private clipboard: Clipboard,
    private streamService: StreamService,
    private activatedRoute: ActivatedRoute,
    private notifyService: NotifyService,
    private textEditorService: TextEditorService
  ) {
    this.quillConfig = textEditorService.quillConfig;

    this.form = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.maxLength(80)]),
      description: new FormControl('', [Validators.required]),
      startDate: new FormControl('', [Validators.required, Validators.maxLength(80)]),
      isPrivate: new FormControl(false),

      banner: new FormControl(''),
      bannerCropSettings: new FormControl(''),
      originBanner: new FormControl('', this.displayBannerError),
      bannerFile: new FormControl(null),
      croppedBannerFile: new FormControl(null),
    }) as EditStreamFormGroup;
  }

  ngOnInit(): void {
    this.activatedRoute.data.pipe(untilDestroyed(this)).subscribe({
      next: data => {
        const streamData = (data as StreamForUserResolverData)?.streamComponentData || null;
        if (streamData) {
          this.stream = {
            ...streamData,
            enterLink: `${window.location.host}/stream/${streamData.enterLink}`,
            hrefLink: `/stream/${streamData.enterLink}`,
          };
          this.id = streamData.id;
          this.form.patchValue({
            title: this.stream.title,
            description: this.stream.description,
            startDate: Utils.utcDateStringToLocalString(this.stream.startDate, this.dateForat),
            isPrivate: this.stream.private,
            banner: this.stream.banner,
            bannerCropSettings: this.stream.bannerCropSettings,
            originBanner: this.stream.originBanner,
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
          banner: result.banner,
          bannerCropSettings: result.bannerCropSettings,
          originBanner: result.originBanner,
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
          title: this.form.controls.title.value,
          description: this.form.controls.description.value,
          isPrivate: this.form.controls.isPrivate.value,
          banner: this.form.controls.banner.value,
          bannerCropSettings: this.form.controls.bannerCropSettings.value,
          originBanner: this.form.controls.originBanner.value,
          startDate: this.form.controls.startDate.value,
        };
        const formData = new FormData();
        this.form.get('bannerFile')?.value && formData.append('bannerFile', this.form.get('bannerFile')?.value);
        this.form.get('croppedBannerFile')?.value &&
          formData.append('croppedBannerFile', this.form.get('croppedBannerFile')?.value);
        formData.append('stream', JSON.stringify({ ...data }));

        this.streamService
          .editStream(this.id, formData)
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
    quill.format('color', 'red');
  }
}

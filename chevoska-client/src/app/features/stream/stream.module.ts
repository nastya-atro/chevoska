import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { STREAM_ROUTES } from './stream.routes';
import { AddNewStreamComponent } from './add-new-stream/addNewStream.component';
import { SharedModule } from '../../shared/shared.module';
import { DpDatePickerModule } from 'ng2-date-picker';
import { EditStreamComponent } from './pending-stream-editing/editStream.component';
import { StatisticStreamComponent } from './done-stream-statistic/statisticStream.component';
import { QuillModule } from 'ngx-quill';
import { ImageUploadModule } from '../../shared/directives/image-upload/imageUpload.module';

@NgModule({
  imports: [
    RouterModule.forChild(STREAM_ROUTES),
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    SharedModule,
    DpDatePickerModule,
    QuillModule,
    ImageUploadModule,
  ],
  declarations: [AddNewStreamComponent, EditStreamComponent, StatisticStreamComponent],
})
export class StreamModule {}

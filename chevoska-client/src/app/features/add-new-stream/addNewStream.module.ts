import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ADD_STREAM_ROUTES } from './addNewStream.routes';
import { AddNewStreamComponent } from './addNewStream.component';
import { SharedModule } from '../../shared/shared.module';
import { DpDatePickerModule } from 'ng2-date-picker';

@NgModule({
  imports: [
    RouterModule.forChild(ADD_STREAM_ROUTES),
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    SharedModule,
    DpDatePickerModule,
  ],
  declarations: [AddNewStreamComponent],
})
export class AddNewStreamModule {}

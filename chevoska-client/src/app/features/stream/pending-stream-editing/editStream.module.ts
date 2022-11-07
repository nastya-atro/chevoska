import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { EDIT_STREAM_ROUTES } from './editStream.routes';
import { EditStreamComponent } from './editStream.component';

@NgModule({
  imports: [RouterModule.forChild(EDIT_STREAM_ROUTES), FormsModule, ReactiveFormsModule, CommonModule, SharedModule],
  declarations: [EditStreamComponent],
})
export class EditStreamModule {}

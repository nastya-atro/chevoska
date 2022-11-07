import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ACTIVE_STREAM_ROUTES } from './activeStream.routes';
import { ActiveStreamComponent } from './activeStream.component';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  imports: [RouterModule.forChild(ACTIVE_STREAM_ROUTES), FormsModule, ReactiveFormsModule, CommonModule, SharedModule],
  declarations: [ActiveStreamComponent],
})
export class ActiveStreamModule {}

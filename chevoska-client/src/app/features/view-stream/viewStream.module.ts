import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { VIEW_STREAM_ROUTES } from './viewStream.routes';
import { SharedModule } from '../../shared/shared.module';
import { EnterSystemComponent } from './enter-system/enterSystem.component';
import { ActiveStreamComponent } from './active-stream/activeStream.component';
import { ReviewComponent } from './review-after-stream/review.component';

@NgModule({
  imports: [RouterModule.forChild(VIEW_STREAM_ROUTES), FormsModule, ReactiveFormsModule, CommonModule, SharedModule],
  declarations: [EnterSystemComponent, ActiveStreamComponent, ReviewComponent],
})
export class ViewStreamModule {}

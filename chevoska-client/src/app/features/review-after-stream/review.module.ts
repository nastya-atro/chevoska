import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { ReviewComponent } from './review.component';
import { REVIEW_ROUTES } from './review.routes';

@NgModule({
  imports: [RouterModule.forChild(REVIEW_ROUTES), FormsModule, ReactiveFormsModule, CommonModule, SharedModule],
  declarations: [ReviewComponent],
})
export class ReviewModule {}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { STATISTIC_STREAM_ROUTES } from './statisticStream.routes';
import { StatisticStreamComponent } from './statisticStream.component';

@NgModule({
  imports: [
    RouterModule.forChild(STATISTIC_STREAM_ROUTES),
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    SharedModule,
  ],
  declarations: [StatisticStreamComponent],
})
export class StatisticStreamModule {}

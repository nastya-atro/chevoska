import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { STREAMS_ROUTES } from './streams.routes';
import { StreamsComponent } from './streams.component';

@NgModule({
  imports: [RouterModule.forChild(STREAMS_ROUTES), FormsModule, ReactiveFormsModule, CommonModule, SharedModule],
  declarations: [StreamsComponent],
})
export class StreamsModule {}

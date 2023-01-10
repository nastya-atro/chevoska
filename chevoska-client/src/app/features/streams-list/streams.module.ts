import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { STREAMS_ROUTES } from './streams.routes';
import { StreamsComponent } from './streams.component';
import { TableModule } from '../../shared/modules/table/table.module';
import { PaginationModule } from '../../shared/modules/pagination/pagination.module';

@NgModule({
  imports: [
    RouterModule.forChild(STREAMS_ROUTES),
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    SharedModule,
    TableModule,
    PaginationModule,
  ],
  declarations: [StreamsComponent],
})
export class StreamsModule {}

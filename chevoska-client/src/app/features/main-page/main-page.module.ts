import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { MAIN_PAGE_ROUTES } from './main-page.routes';
import { MainStreamsListComponent } from './main-streams-list/main-streams-list..component';
import { TableModule } from '../../shared/modules/table/table.module';
import { PaginationModule } from '../../shared/modules/pagination/pagination.module';
import { MainStreamDetailComponent } from './main-stream-detail/main-stream-detail.component';

@NgModule({
  imports: [
    RouterModule.forChild(MAIN_PAGE_ROUTES),
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    SharedModule,
    TableModule,
    PaginationModule,
  ],
  declarations: [MainStreamsListComponent, MainStreamDetailComponent],
})
export class MainPageModule {}

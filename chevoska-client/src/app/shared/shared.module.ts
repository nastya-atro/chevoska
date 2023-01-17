import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ValidateErrorPipe } from '../core/pipes/validation.pipe';
import { NotifyModule } from './modules/notifications/notify.module';
import { DateCountDownComponent } from './modules/date-count-down/date-count-down.component';
import { DateCountDownModule } from './modules/date-count-down/date-count-down.module';
import { LoaderComponent } from './directives/loader/loader.component';
import { LoaderDirective } from './directives/loader/loader.directive';
import { ModalRequestComponent } from './components/modals/modal-request/modal-request.component';
import { SelectComponent } from './components/select/select.component';
import { MultiselectSearchComponent } from './components/multiselect-search/multiselect-search.component';
import { MultiSelectFilterPipe } from '../core/pipes/multi-select-filter.pipe';
import { InfiniteScrollComponent } from './components/infinite-scroll/infinite-scroll.component';
import { MultiselectComponent } from './components/multiselect/multiselect.component';

const COMPONENTS = [
  PageNotFoundComponent,
  ValidateErrorPipe,
  MultiSelectFilterPipe,
  DateCountDownComponent,
  LoaderComponent,
  ModalRequestComponent,
  SelectComponent,
  MultiselectSearchComponent,
  InfiniteScrollComponent,
  MultiselectComponent,
];

@NgModule({
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule, NotifyModule, DateCountDownModule],
  declarations: [...COMPONENTS, LoaderDirective],
  exports: [...COMPONENTS, LoaderDirective],
})
export class SharedModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ValidateErrorPipe } from '../core/pipes/validation.pipe';
import { NotifyModule } from './modules/notifications/notify.module';

const COMPONENTS = [PageNotFoundComponent, ValidateErrorPipe];

@NgModule({
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule, NotifyModule],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
})
export class SharedModule {}

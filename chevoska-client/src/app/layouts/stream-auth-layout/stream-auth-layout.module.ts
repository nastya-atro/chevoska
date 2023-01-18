import { StreamAuthLayoutComponent } from './stream-auth-layout.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { STREAM_AUTH_LAYOUT_ROUTES } from './stream-auth-layout-routing.module';
import { CommonModule } from '@angular/common';
import { QuillModule } from 'ngx-quill';

@NgModule({
  declarations: [StreamAuthLayoutComponent],
  imports: [RouterModule.forChild(STREAM_AUTH_LAYOUT_ROUTES), CommonModule, QuillModule],
  exports: [StreamAuthLayoutComponent],
})
export class StreamAuthLayoutModule {}

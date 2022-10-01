import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MAIN_ROUTES} from "./main.routes";
import {MainComponent} from "./main.component";

@NgModule({
  imports: [
    RouterModule.forChild(MAIN_ROUTES),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [MainComponent],
})
export class MainModule {}

import { APP_INITIALIZER, NgModule } from '@angular/core';
import { MainLayoutComponent } from './main-layout.component';
import { RouterModule } from '@angular/router';
import { MAIN_LAYOUT_ROUTES } from './main-layout-routing.module';
import {SharedModule} from "../../shared/shared.module";


@NgModule({
  declarations: [MainLayoutComponent],
  imports: [SharedModule, RouterModule.forChild(MAIN_LAYOUT_ROUTES)],
  exports: [MainLayoutComponent],
})
export class MainLayoutModule {}

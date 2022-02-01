import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OfertyRoutingModule } from './oferty-routing.module';
import { OfertyComponent } from './oferty.component';
import { ThemeModule } from '@zapisywarka-client-aps/shared/theme';
import { NB_TIME_PICKER_CONFIG } from '@nebular/theme';

@NgModule({
  declarations: [OfertyComponent],
  imports: [CommonModule, ThemeModule],
  providers: [{ provide: NB_TIME_PICKER_CONFIG, useValue: {} }],
  exports: [],
})
export class OfertyModule {}

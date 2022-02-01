import { NgModule } from '@angular/core';

import { MainRoutingModule } from './main-routing.module';
import { ThemeModule } from '@zapisywarka-client-aps/shared/theme';
import { NbMenuModule } from '@nebular/theme';
import { MainComponent } from './main.component';
import { StartModule } from './start/start.module';
import { OfertyModule } from './oferty/oferty.module';

@NgModule({
  declarations: [MainComponent],
  imports: [
    ThemeModule,
    NbMenuModule,
    StartModule,
    OfertyModule,
    MainRoutingModule,
  ],
  exports: [MainComponent],
})
export class MainModule {}

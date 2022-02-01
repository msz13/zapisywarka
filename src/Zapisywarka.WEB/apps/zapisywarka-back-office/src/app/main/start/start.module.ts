import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StartComponent } from './start/start.component';
import { MenuCardComponent } from './menu-card/menu-card.component';
import { ThemeModule } from '@zapisywarka-client-aps/shared/theme';

@NgModule({
  declarations: [StartComponent, MenuCardComponent],
  imports: [CommonModule, ThemeModule],
})
export class StartModule {}

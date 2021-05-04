import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { SharedMaterialModule } from '@zapisywarka.web/material';
import { InitialAvatarComponent } from './initial-avatar/initial-avatar.component';
import { SideNavAccountInfoComponent } from './side-nav-account-info/side-nav-account-info.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { MenuCardComponent } from './menu-card/menu-card.component';
import { FlexLayoutModule } from '@angular/flex-layout'

const COMPONENTS = [
  HeaderComponent,
  MainMenuComponent,
  InitialAvatarComponent,
  SideNavAccountInfoComponent,
  MainLayoutComponent,
  MenuCardComponent
];

@NgModule({
  imports: [CommonModule, SharedMaterialModule, FlexLayoutModule],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS, FlexLayoutModule],
})
export class SharedUiModule {}

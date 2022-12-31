import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { SharedMaterialModule } from '@zapisywarka-web/web-shared-material';
import { InitialAvatarComponent } from './initial-avatar/initial-avatar.component';
import { SideNavAccountInfoComponent } from './side-nav-account-info/side-nav-account-info.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { MenuCardComponent } from './menu-card/menu-card.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DateTimePickerComponent } from './date-time-picker/date-time-picker.component';
import { TextFieldComponent } from './text-field/text-field.component';
import { ReactiveFormsModule } from '@angular/forms';

const COMPONENTS = [
  HeaderComponent,
  MainMenuComponent,
  InitialAvatarComponent,
  SideNavAccountInfoComponent,
  MainLayoutComponent,
  MenuCardComponent,
  TextFieldComponent
];

@NgModule({
  imports: [CommonModule, SharedMaterialModule, FlexLayoutModule, ReactiveFormsModule],
  declarations: [...COMPONENTS, DateTimePickerComponent, TextFieldComponent],
  exports: [...COMPONENTS, FlexLayoutModule, DateTimePickerComponent, TextFieldComponent],
})
export class SharedUiKitModule {}

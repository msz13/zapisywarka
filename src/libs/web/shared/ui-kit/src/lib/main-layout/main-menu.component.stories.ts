import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedMaterialModule } from '@zapisywarka-web/web-shared-material';
import { HeaderComponent } from '../header/header.component';
import { InitialAvatarComponent } from '../initial-avatar/initial-avatar.component';
import { MainMenuComponent } from '../main-menu/main-menu.component';
import { SideNavAccountInfoComponent } from '../side-nav-account-info/side-nav-account-info.component';
import { MainLayoutComponent } from './main-layout.component';

export default {
  title: 'MainLayoutComponent',
};

export const primary = () => ({
  moduleMetadata: {
    imports: [BrowserModule, BrowserAnimationsModule, SharedMaterialModule],
    declarations: [
      HeaderComponent,
      MainMenuComponent,
      SideNavAccountInfoComponent,
      InitialAvatarComponent,
    ],
  },
  component: MainLayoutComponent,
  props: {},
});

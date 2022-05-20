import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebLandingPageComponent } from './landing-page/landing-page.component';
import { WebSharedMaterialModule } from '@zapisywarka-web/web-shared-material';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, WebSharedMaterialModule, RouterModule],
  declarations: [WebLandingPageComponent],
  exports: [WebLandingPageComponent],
})
export class WebLandingPageModule {}

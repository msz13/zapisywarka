import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebLandingPageComponent } from './landing-page/landing-page.component';
import { SharedMaterialModule } from '@zapisywarka-web/web-shared-material';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, SharedMaterialModule, RouterModule],
  declarations: [WebLandingPageComponent],
  exports: [WebLandingPageComponent],
})
export class WebLandingPageModule {}

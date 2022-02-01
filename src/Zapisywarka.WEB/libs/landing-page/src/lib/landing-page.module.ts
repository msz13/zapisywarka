import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SharedMaterialModule } from '@zapisywarka.web/material';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, SharedMaterialModule, RouterModule],
  declarations: [LandingPageComponent],
  exports: [LandingPageComponent],
})
export class LandingPageModule {}

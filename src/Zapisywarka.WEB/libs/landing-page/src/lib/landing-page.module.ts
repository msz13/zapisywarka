import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageComponent } from './landing-page/landing-page.component';
import {SharedMaterialModule} from '@zapisywarka.web/material'

@NgModule({
  imports: [CommonModule, SharedMaterialModule],
  declarations: [LandingPageComponent],
  exports: [LandingPageComponent]
})
export class LandingPageModule {}

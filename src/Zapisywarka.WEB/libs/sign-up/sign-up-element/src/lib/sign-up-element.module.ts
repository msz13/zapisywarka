import { ApplicationRef, DoBootstrap, Injector, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './sign-up/sign-up.component';
import {SharedMaterialModule} from '@zapisywarka.web/material';
import { createCustomElement } from '@angular/elements'
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [BrowserModule, BrowserAnimationsModule, CommonModule, SharedMaterialModule],
  declarations: [SignUpComponent],
  entryComponents: [SignUpComponent]
  
}) 
export class SignUpElementModule implements DoBootstrap {

  constructor  (private injector: Injector) {}
  
  ngDoBootstrap(): void {
    const webComponent = createCustomElement(SharedMaterialModule, {injector: this.injector});
    customElements.define('sign-up-form', webComponent);
  }
 
  
}

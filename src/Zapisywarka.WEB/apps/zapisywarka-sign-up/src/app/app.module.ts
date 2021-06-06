import { CommonModule } from '@angular/common';
import { DoBootstrap, Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedMaterialModule } from '@zapisywarka.web/material';
import { AppComponent } from './app.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { createCustomElement } from '@angular/elements';
import { SignUpContainerComponent } from './sign-up/sign-up.container.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [BrowserModule, BrowserAnimationsModule, CommonModule, SharedMaterialModule, ReactiveFormsModule, HttpClientModule],
  declarations: [SignUpComponent, SignUpContainerComponent],
  entryComponents: [SignUpComponent],
  //bootstrap: [AppComponent],
})
export class AppModule  {

  constructor(private injector: Injector) {}

  ngDoBootstrap(): void {

    const webComponent = createCustomElement(SignUpContainerComponent, {injector: this.injector});
    customElements.define('app-sign-up', webComponent);
  }
}

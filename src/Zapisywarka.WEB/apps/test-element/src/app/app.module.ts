import { ApplicationRef, DoBootstrap, Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { createCustomElement } from '@angular/elements'

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [BrowserModule],
  providers: [],
  //bootstrap: [AppComponent],
})
export class AppModule implements DoBootstrap {
  
  constructor (private injector: Injector) {}

  ngDoBootstrap(): void {

     const webComponent = createCustomElement(HeaderComponent, {injector: this.injector});
    customElements.define('app-header', webComponent);
  }
}

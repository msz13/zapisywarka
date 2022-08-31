import { Component } from "@angular/core";


@Component({
    template: `<router-outlet></router-outlet>
    <div>
    <a [routerLink]="['spike/test']" routerLinkActive="router-link-active"  class="link-2">Test link</a>
    </div>`
  })
  export class TestAppComponent {}
  
  @Component({
    template: `<a [routerLink]="['spike/test']" routerLinkActive="router-link-active"  class="link-1">Test link</a>`
  })
  export class TestComponent {}

  @Component({
    template: "<p>Test component works!</p>"
  })
  export class Test2Component {}

  
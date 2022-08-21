import { Component, NgModule } from "@angular/core";
import {Location } from "@angular/common"
import { createRoutingFactory} from "@ngneat/spectator/jest";
import { Router, RouterModule } from "@angular/router";
import { fakeAsync, tick } from "@angular/core/testing";


@Component({
    template: "<router-outlet></router-outlet>"
  })
  export class TestAppComponent {}

  @Component({
    template: "<router-outlet></router-outlet>"
  })
  export class TestAppWrapperComponent {}
  
  @Component({
    template: `<a [routerLink]="['/test']" routerLinkActive="router-link-active"  class="link-1">Test link</a>`
  })
  export class TestComponent {}

  @Component({
    template: "<p>Test component works!</p>"
  })
  export class Test2Component {}

  @NgModule({
    declarations: [TestAppComponent, TestComponent, Test2Component],
    imports: [RouterModule.forChild([
        {path: '',
        children: [
            {
            path: '',
            component: TestComponent
          },
          {
            path: 'test',
            component: Test2Component
          }
        ]        

        }
         
    ])]
  })
  export class TestModule {

  }

describe('Routing integration test', () => {

   /*  const createComponent = createRoutingFactory({
      component: TestAppWrapperComponent,
     // declarations: [TestAppComponent,TestComponent, Test2Component],
      stubsEnabled: false,
      routes: [
        {
          path: 'testowy',
          loadChildren: ()=> TestModule
        },
        {
          path: 'test',
          component: Test2Component
        }
      ]
    }); */

    const createComponent = createRoutingFactory({
        component: TestAppWrapperComponent,
       // declarations: [TestAppComponent,TestComponent, Test2Component],
        stubsEnabled: false,
        routes: [
          {
            path: 'testowy',
            loadChildren: ()=> TestModule
          }         
        ]
      });

    
  
    it('should navigate away using router link', async() => {
      const spectator = createComponent();
  
      
      // wait for promises to resolve...
      await spectator.fixture.whenStable();
      //spectator.tick()
  
      // test the current route by asserting the location
      expect(spectator.inject(Location).path()).toBe('/');
        
      // click on a router link
      
      spectator.router.navigate(['testowy'])
      //router.navigate([''])
  
      // don't forget to wait for promises to resolve...
      await spectator.fixture.whenStable();
      //spectator.tick()
       
      //spectator.router.navigate(['testowy', 'test'])
      // test the new route by asserting the location
      expect(spectator.inject(Location).path()).toBe('/testowy');

      
        spectator.click('.link-1');

       await spectator.fixture.whenStable();
      //  spectator.tick()

       expect(spectator.inject(Location).path()).toBe('/testowy/test'); 
      expect(spectator.query('p')?.textContent).toBe("Test component works!")
  
      })   
      
    
  });
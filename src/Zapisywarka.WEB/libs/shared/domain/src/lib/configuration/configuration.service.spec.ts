import { TestBed } from '@angular/core/testing';

import { ConfigurationService } from './configuration.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { HttpClient } from '@angular/common/http';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'


describe('ConfigurationService', () => {
  let service: ConfigurationService;
  let httpTestingController: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(ConfigurationService);

  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
 

  it('should get config',  () => {

    
    const config = {
      auth:  
      {
        issuer: '/',
        clientId: 'spa',                
      },
      signUpURL: '/signUp'
    }
   

     service.loadConfig().then(()=>{
      expect(service.getConfig()).toStrictEqual(config);
    })    

    const req = httpTestingController.expectOne('./assets/config.json');

    req.flush(config)

    httpTestingController.verify();

  });


});

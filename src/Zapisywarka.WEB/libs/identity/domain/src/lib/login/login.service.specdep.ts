import { createHttpFactory, HttpMethod, SpectatorHttp } from '@ngneat/spectator';
import { LoginCredentials, LoginService } from './login.service';
import { IdentityDomainModule} from '../identity-domain.module'
import { IFormGroup, RxReactiveFormsModule, RxwebValidators } from '@rxweb/reactive-form-validators';
import { fakeAsync, tick } from '@angular/core/testing';
 

const setFormValues = (form: IFormGroup<LoginCredentials>, loginCredentials: LoginCredentials) => {
  form.controls.userName.setValue(loginCredentials.userName)
  form.controls.password.setValue(loginCredentials.password)
  form.controls.rememberMe.setValue(loginCredentials.rememberMe)
}

describe('LoginService', () => {
  let spectator: SpectatorHttp<LoginService>;
  const createHttp = createHttpFactory({
    service: LoginService,
    imports: [RxReactiveFormsModule]
  });

  beforeEach(() => spectator = createHttp());

 it('should post login data', () => {
    
    const loginCredentials = {
      userName: 'Mat',
      password: 'password',
      rememberMe: true
    }

    const form = spectator.service.getLoginForm()

    setFormValues(form, loginCredentials)

     spectator.service.submit()

     const req = spectator.expectOne('/users/login', HttpMethod.POST);

     expect(req.request.body).toStrictEqual(loginCredentials)
  });

  it('should emit loading state when sending http request', fakeAsync(()=>{

    const loginCredentials = {
      userName: 'Mat',
      password: 'password',
      rememberMe: true
    }

    const form = spectator.service.getLoginForm()

    setFormValues(form, loginCredentials)

    let loading: boolean
    spectator.service.loading$.subscribe(value => loading = value)
    
    tick()
    expect(loading).toBe(false)
    
    spectator.service.submit()

    const req = spectator.expectOne('/users/login', HttpMethod.POST);

    tick()
    expect(loading).toBe(true)
    tick()
    expect(loading).toBe(false)


      
  })
)


  describe('request validation', ()=>{

    it('when username is empty should return form error', ()=>{
      const loginCredentials = {
        userName: '',
        password: 'password',
        rememberMe: true
      }
  
      const form = spectator.service.getLoginForm()
  
      setFormValues(form, loginCredentials)

      spectator.service.submit()

      expect(form.controls.userName.errorMessage).toMatch('Nazwa użytkownika jest wymagana')

    })

    it('when password is empty should return form error', ()=>{
      const loginCredentials = {
        userName: 'username',
        password: '',
        rememberMe: true
      }
  
      const form = spectator.service.getLoginForm()
      
      setFormValues(form, loginCredentials)

      spectator.service.submit()

      

      expect(form.controls.password.errorMessage).toMatch('Hasło jest wymagane')

    })
    

    it('when login or password is invalid should return form error', ()=>{
      
      const loginCredentials = {
        userName: 'username',
        password: 'password',
        rememberMe: true
      }
    
      const errMsg = 'Niepoprawny login lub hasło'
  
      const form = spectator.service.getLoginForm()
      
      setFormValues(form, loginCredentials)

      let formError: any

      form.valueChanges.subscribe(value => {
        console.log('emited value')
        console.log('erorrs '+form.errors)
        formError = form.errors
      })

           
      spectator.service.submit()

      const req = spectator.expectOne('/users/login', HttpMethod.POST);

      req.flush({message: errMsg}, {status: 401, statusText: 'Unauthorised request'})

      expect(req.request.body).toStrictEqual(loginCredentials)
       
      form.updateValueAndValidity()
      expect(formError?.invalidCredentials).toBeDefined()
      expect(formError?.invalidCredentials.message).toMatch('test')

    })
    
    

  })
});

import { Spectator, createComponentFactory } from '@ngneat/spectator/jest';
import { UserService } from '@zapisywarka-client-aps/web-identity-domain';
import { SignUpContainerComponent } from '@zapisywarka-web/web-identity-sign-up-feature-dep';


describe('ButtonComponent', () => {
  let spectator: Spectator<SignUpContainerComponent>;
  const createComponent = createComponentFactory({
      component: SignUpContainerComponent,
      componentMocks: [UserService],
   

  });

  beforeEach(() => spectator = createComponent());

 it('should post user registration on submit', ()=>{

    const userService = spectator.inject(UserService)


 })
});
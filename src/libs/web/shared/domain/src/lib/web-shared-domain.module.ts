import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormErrorMessagesPipe } from './form-error-messages/form-error-messages.pipe';
import { ConfigurationService } from './configuration/configuration.service';

@NgModule({
  imports: [CommonModule],
  declarations: [FormErrorMessagesPipe],
  exports: [FormErrorMessagesPipe],
})
export class WebSharedDomainModule {
  public static forRoot(): ModuleWithProviders<WebSharedDomainModule> {
    return {
      ngModule: WebSharedDomainModule,
      providers: [
        {
          provide: APP_INITIALIZER,
          useFactory: (confService: ConfigurationService) => () =>
            confService.loadConfig(),
          deps: [ConfigurationService],
          multi: true,
        },
      ],
    };
  }
}

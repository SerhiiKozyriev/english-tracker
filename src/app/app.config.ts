import { ApplicationConfig } from '@angular/core';

import { routes } from './app.routes';
import { provideAppCore } from '@core/index';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAppCore(routes)
  ]
};

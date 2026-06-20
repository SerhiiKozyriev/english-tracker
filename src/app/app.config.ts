import { ApplicationConfig } from '@angular/core';

import { provideAppCore } from '@core/index';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideAppCore(routes)],
};

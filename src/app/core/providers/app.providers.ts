import { EnvironmentProviders, makeEnvironmentProviders, provideBrowserGlobalErrorListeners } from '@angular/core';
import { Routes, provideRouter } from '@angular/router';

import { provideApiClient } from './http.providers';

export function provideAppCore(routes: Routes): EnvironmentProviders {
  return makeEnvironmentProviders([provideBrowserGlobalErrorListeners(), provideRouter(routes), provideApiClient()]);
}

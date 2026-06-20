import { provideHttpClient, withXhr } from '@angular/common/http';
import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';

export function provideApiClient(): EnvironmentProviders {
  return makeEnvironmentProviders([provideHttpClient(withXhr())]);
}

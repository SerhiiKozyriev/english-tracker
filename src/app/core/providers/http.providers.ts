import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { provideHttpClient, withXhr } from '@angular/common/http';

export function provideApiClient(): EnvironmentProviders {
  return makeEnvironmentProviders([provideHttpClient(withXhr())]);
}

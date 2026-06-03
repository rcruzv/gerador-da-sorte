import { Provider } from '@angular/core';
import { AuthGateway } from './auth.gateway';
import { USE_OIDC_AUTH } from './auth.config';
import { MockAuthService } from './mock-auth.service';
import { OidcAuthService } from './oidc-auth.service';

export const AUTH_PROVIDERS: Provider[] = [
  {
    provide: AuthGateway,
    useClass: USE_OIDC_AUTH ? OidcAuthService : MockAuthService,
  },
];


import { AuthConfig } from 'angular-oauth2-oidc';

export const USE_OIDC_AUTH = false;

export function createOAuthConfig(origin: string): AuthConfig {
  return {
    issuer: 'https://auth.example.com/realms/gerador-da-sorte',
    redirectUri: `${origin}/auth/callback`,
    postLogoutRedirectUri: `${origin}/`,
    clientId: 'gerador-da-sorte-web',
    responseType: 'code',
    scope: 'openid profile email',
    strictDiscoveryDocumentValidation: false,
    showDebugInformation: false,
  };
}


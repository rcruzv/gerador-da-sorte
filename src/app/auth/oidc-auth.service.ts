import { DOCUMENT } from '@angular/common';
import { Injectable, computed, inject, signal } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { AuthGateway } from './auth.gateway';
import { createOAuthConfig } from './auth.config';
import { AuthUser, LoginCredentials, RegisterCredentials } from './auth.models';

@Injectable()
export class OidcAuthService extends AuthGateway {
  private readonly document = inject(DOCUMENT);
  private readonly oauthService = inject(OAuthService);
  private readonly user = signal<AuthUser | null>(null);
  override readonly currentUser = this.user.asReadonly();
  override readonly isAuthenticated = computed(() => this.oauthService.hasValidAccessToken());

  constructor() {
    super();
    this.oauthService.configure(createOAuthConfig(this.document.location.origin));
    void this.completeLogin();
  }

  override async login(_credentials: LoginCredentials): Promise<void> {
    this.oauthService.initCodeFlow();
  }

  override async register(_credentials: RegisterCredentials): Promise<void> {
    this.oauthService.initCodeFlow(undefined, { screen_hint: 'signup' });
  }

  override async forgotPassword(email: string): Promise<void> {
    this.oauthService.initCodeFlow(undefined, {
      login_hint: email,
      prompt: 'login',
    });
  }

  override async completeLogin(): Promise<void> {
    await this.oauthService.loadDiscoveryDocumentAndTryLogin();
    this.user.set(this.readClaims());
  }

  override logout(): void {
    this.oauthService.logOut();
    this.user.set(null);
  }

  private readClaims(): AuthUser | null {
    const claims = this.oauthService.getIdentityClaims() as
      | { name?: string; email?: string; preferred_username?: string }
      | null;

    if (!claims) {
      return null;
    }

    return {
      name: claims.name ?? claims.preferred_username ?? 'Usuario',
      email: claims.email ?? '',
    };
  }
}

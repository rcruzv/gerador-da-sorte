import { Injectable, computed, signal } from '@angular/core';
import { AuthGateway } from './auth.gateway';
import { AuthUser, LoginCredentials, RegisterCredentials } from './auth.models';

const STORAGE_KEY = 'gerador-da-sorte.mock-user';

@Injectable()
export class MockAuthService extends AuthGateway {
  // TODO: Remover este mock apos os testes de autenticacao e ativar USE_OIDC_AUTH com o provedor real.
  private readonly user = signal<AuthUser | null>(this.readStoredUser());
  override readonly currentUser = this.user.asReadonly();
  override readonly isAuthenticated = computed(() => this.user() !== null);

  override async login(credentials: LoginCredentials): Promise<void> {
    const user: AuthUser = {
      name: this.getNameFromEmail(credentials.email),
      email: credentials.email,
    };

    this.setUser(user);
  }

  override async register(credentials: RegisterCredentials): Promise<void> {
    this.setUser({
      name: credentials.name,
      email: credentials.email,
    });
  }

  override async forgotPassword(email: string): Promise<void> {
    sessionStorage.setItem('gerador-da-sorte.mock-recovery-email', email);
  }

  override async completeLogin(): Promise<void> {
    return;
  }

  override logout(): void {
    sessionStorage.removeItem(STORAGE_KEY);
    this.user.set(null);
  }

  private setUser(user: AuthUser): void {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    this.user.set(user);
  }

  private readStoredUser(): AuthUser | null {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return null;
    }

    try {
      return JSON.parse(stored) as AuthUser;
    } catch {
      sessionStorage.removeItem(STORAGE_KEY);
      return null;
    }
  }

  private getNameFromEmail(email: string): string {
    const [name] = email.split('@');
    return name ? name.replace(/[._-]+/g, ' ') : 'Usuario';
  }
}

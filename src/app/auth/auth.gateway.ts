import { Signal } from '@angular/core';
import { LoginCredentials, RegisterCredentials, AuthUser } from './auth.models';

export abstract class AuthGateway {
  abstract readonly currentUser: Signal<AuthUser | null>;
  abstract readonly isAuthenticated: Signal<boolean>;
  abstract login(credentials: LoginCredentials): Promise<void>;
  abstract register(credentials: RegisterCredentials): Promise<void>;
  abstract forgotPassword(email: string): Promise<void>;
  abstract completeLogin(): Promise<void>;
  abstract logout(): void;
}

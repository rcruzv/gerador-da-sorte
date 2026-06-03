export type AuthMode = 'login' | 'register' | 'forgot-password';

export interface AuthUser {
  name: string;
  email: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  name: string;
}


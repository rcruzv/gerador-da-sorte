import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGateway } from './auth.gateway';

@Component({
  selector: 'app-auth-callback',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="auth-callback">
      <strong>Validando acesso...</strong>
      <span *ngIf="message()">{{ message() }}</span>
    </section>
  `,
  styles: [
    `
      .auth-callback {
        display: grid;
        min-height: 100vh;
        place-content: center;
        gap: 0.6rem;
        background: #0b1220;
        color: #eef7ff;
        text-align: center;
      }

      .auth-callback span {
        color: #b9c7d9;
      }
    `,
  ],
})
export class AuthCallbackComponent {
  private readonly auth = inject(AuthGateway);
  private readonly router = inject(Router);
  protected readonly message = signal('');

  constructor() {
    void this.finishLogin();
  }

  private async finishLogin(): Promise<void> {
    try {
      await this.auth.completeLogin();
      await this.router.navigate(['/estatisticas']);
    } catch {
      this.message.set('Nao foi possivel concluir o login.');
      await this.router.navigate(['/auth/login']);
    }
  }
}

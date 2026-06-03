import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthGateway } from './auth.gateway';
import { AuthMode } from './auth.models';
import { USE_OIDC_AUTH } from './auth.config';

@Component({
  selector: 'app-auth-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './auth-page.html',
  styleUrl: './auth-page.css',
})
export class AuthPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly auth = inject(AuthGateway);

  protected readonly oidcEnabled = USE_OIDC_AUTH;
  protected readonly mode = signal<AuthMode>(
    this.route.snapshot.data['mode'] as AuthMode,
  );
  protected readonly isSubmitting = signal(false);
  protected readonly feedback = signal('');
  protected readonly form = {
    name: '',
    email: '',
    password: '',
  };
  protected readonly title = computed(() => {
    switch (this.mode()) {
      case 'register':
        return 'Criar sua conta';
      case 'forgot-password':
        return 'Recuperar acesso';
      default:
        return 'Entrar na conta';
    }
  });
  protected readonly subtitle = computed(() => {
    switch (this.mode()) {
      case 'register':
        return 'Cadastre-se para acessar os geradores e estatisticas.';
      case 'forgot-password':
        return 'Informe seu e-mail para iniciar a recuperacao de senha.';
      default:
        return 'Use o fluxo temporario para acessar a area autenticada.';
    }
  });

  constructor() {
    this.route.data.subscribe((data) => {
      this.mode.set(data['mode'] as AuthMode);
      this.feedback.set('');
    });
  }

  protected async submit(): Promise<void> {
    if (!this.form.email || (this.mode() !== 'forgot-password' && !this.form.password)) {
      this.feedback.set('Preencha os campos obrigatorios.');
      return;
    }

    this.isSubmitting.set(true);
    this.feedback.set('');

    try {
      if (this.mode() === 'register') {
        await this.auth.register({
          name: this.form.name || 'Usuario',
          email: this.form.email,
          password: this.form.password,
        });
        await this.enterApplication();
        return;
      }

      if (this.mode() === 'forgot-password') {
        await this.auth.forgotPassword(this.form.email);
        this.feedback.set('Solicitacao registrada. Volte para o login para continuar.');
        return;
      }

      await this.auth.login({
        email: this.form.email,
        password: this.form.password,
      });
      await this.enterApplication();
    } finally {
      this.isSubmitting.set(false);
    }
  }

  private async enterApplication(): Promise<void> {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
    await this.router.navigateByUrl(returnUrl || '/estatisticas');
  }
}


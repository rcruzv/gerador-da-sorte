import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { AUTH_PROVIDERS } from './auth.providers';
import { AuthPageComponent } from './auth-page';

describe('AuthPageComponent', () => {
  let fixture: ComponentFixture<AuthPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthPageComponent],
      providers: [
        provideRouter([
          { path: 'auth/login', component: AuthPageComponent, data: { mode: 'login' } },
          { path: 'estatisticas', component: AuthPageComponent },
        ]),
        AUTH_PROVIDERS,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthPageComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render login, register and forgot links', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.textContent).toContain('Login');
    expect(compiled.textContent).toContain('Register');
    expect(compiled.textContent).toContain('Forgot');
  });

  it('should enter the app with the mock login flow', async () => {
    const router = TestBed.inject(Router);
    await router.navigateByUrl('/auth/login');

    const compiled = fixture.nativeElement as HTMLElement;
    const email = compiled.querySelector('input[name="email"]') as HTMLInputElement;
    const password = compiled.querySelector('input[name="password"]') as HTMLInputElement;
    const submit = compiled.querySelector('.auth-submit') as HTMLButtonElement;

    email.value = 'teste@geradordasorte.local';
    email.dispatchEvent(new Event('input'));
    password.value = 'senha-temporaria';
    password.dispatchEvent(new Event('input'));
    submit.click();
    await fixture.whenStable();

    expect(router.url).toBe('/estatisticas');
  });
});

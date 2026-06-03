import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { App } from './app';
import { AUTH_PROVIDERS } from './auth/auth.providers';

@Component({
  standalone: true,
  template: '',
})
class EmptyRouteComponent {}

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideRouter([
          { path: '', component: EmptyRouteComponent },
          { path: 'auth/login', component: EmptyRouteComponent },
          { path: 'megasena', component: EmptyRouteComponent },
        ]),
        AUTH_PROVIDERS,
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render navigation links on authenticated routes', async () => {
    const router = TestBed.inject(Router);
    const fixture = TestBed.createComponent(App);

    await router.navigateByUrl('/megasena');
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const navText = Array.from(compiled.querySelectorAll('a'))
      .map((link) => link.textContent?.trim() ?? '')
      .join(' ');

    expect(navText).toContain('Estatisticas');
    expect(navText).toContain('Mega-Sena');
    expect(navText).toContain('Lotofacil');
    expect(navText).toContain('Quina');
    expect(navText).toContain('Loteca');
  });

  it('should keep landing route outside dashboard shell', async () => {
    const router = TestBed.inject(Router);
    const fixture = TestBed.createComponent(App);

    await router.navigateByUrl('/');
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.sidebar')).toBeNull();
  });

  it('should keep auth route outside dashboard shell', async () => {
    const router = TestBed.inject(Router);
    const fixture = TestBed.createComponent(App);

    await router.navigateByUrl('/auth/login');
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.sidebar')).toBeNull();
  });

  it('should collapse the sidebar from the shell action button', async () => {
    const router = TestBed.inject(Router);
    const fixture = TestBed.createComponent(App);

    await router.navigateByUrl('/megasena');
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const collapseButton = compiled.querySelector(
      '.shell-icon-button',
    ) as HTMLButtonElement;

    collapseButton.click();
    fixture.detectChanges();

    expect(compiled.querySelector('.dashboard-shell')?.classList).toContain(
      'sidebar-collapsed',
    );
  });

  it('should show support and sign out inside the user menu', async () => {
    const router = TestBed.inject(Router);
    const fixture = TestBed.createComponent(App);

    await router.navigateByUrl('/megasena');
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const userButton = compiled.querySelector('.user-avatar') as HTMLButtonElement;

    userButton.click();
    fixture.detectChanges();

    const menuText = compiled.querySelector('.user-dropdown')?.textContent ?? '';
    expect(menuText).toContain('Suporte');
    expect(menuText).toContain('Sair');
  });
});

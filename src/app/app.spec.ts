import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render navigation links', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const navText = Array.from(compiled.querySelectorAll('a'))
      .map((link) => link.textContent?.trim() ?? '')
      .join(' ');

    expect(navText).toContain('Início');
    expect(navText).toContain('Mega-Sena');
    expect(navText).toContain('Lotofácil');
    expect(navText).toContain('Estatísticas');
    expect(navText).toContain('Quina');
    expect(navText).toContain('Loteca');
  });
});

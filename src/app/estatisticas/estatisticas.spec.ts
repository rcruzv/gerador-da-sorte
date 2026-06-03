import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstatisticasComponent } from './estatisticas';

describe('EstatisticasComponent', () => {
  let fixture: ComponentFixture<EstatisticasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstatisticasComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EstatisticasComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render both lottery tabs', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.textContent).toContain('Mega-Sena');
    expect(compiled.textContent).toContain('Lotofácil');
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { fakeAsync, tick } from '@angular/core/testing';

import { GeradorMegasenaComponent } from './gerador-megasena';

describe('GeradorMegasenaComponent', () => {
  let component: GeradorMegasenaComponent;
  let fixture: ComponentFixture<GeradorMegasenaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeradorMegasenaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GeradorMegasenaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should reject quantities outside the allowed range', () => {
    component.gerarJogos('0');
    expect(component.mensagem).toBe(
      'Informe uma quantidade entre 1 e 50 jogos.',
    );
    expect(component.tipoMensagem).toBe('error');

    component.gerarJogos('51');
    expect(component.mensagem).toBe(
      'Informe uma quantidade entre 1 e 50 jogos.',
    );
    expect(component.tipoMensagem).toBe('error');
  });

  it('should generate games with 6 unique numbers between 1 and 60', fakeAsync(() => {
    component.gerarJogos('2');
    tick(1000);

    expect(component.jogosGerados.length).toBe(2);
    component.jogosGerados.forEach((jogo) => {
      expect(jogo.length).toBe(6);
      expect(new Set(jogo).size).toBe(6);
      jogo.forEach((dezena) => {
        expect(dezena).toBeGreaterThanOrEqual(1);
        expect(dezena).toBeLessThanOrEqual(60);
      });
    });
  }));
});

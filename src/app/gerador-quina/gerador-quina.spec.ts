import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeradorQuinaComponent } from './gerador-quina';

describe('GeradorQuinaComponent', () => {
  let component: GeradorQuinaComponent;
  let fixture: ComponentFixture<GeradorQuinaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeradorQuinaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GeradorQuinaComponent);
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

  it('should generate games with 5 numbers between 1 and 80', () => {
    component.gerarJogos('3');

    expect(component.jogosGerados.length).toBe(3);
    component.jogosGerados.forEach((jogo) => {
      expect(jogo.length).toBe(5);
      expect(new Set(jogo).size).toBe(5);
      jogo.forEach((dezena) => {
        expect(dezena).toBeGreaterThanOrEqual(1);
        expect(dezena).toBeLessThanOrEqual(80);
      });
    });
  });
});

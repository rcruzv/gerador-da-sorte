import { ComponentFixture, TestBed } from '@angular/core/testing';
import { fakeAsync, tick } from '@angular/core/testing';

import { GeradorLotofacilComponent } from './gerador-lotofacil';

describe('GeradorLotofacilComponent', () => {
  let component: GeradorLotofacilComponent;
  let fixture: ComponentFixture<GeradorLotofacilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeradorLotofacilComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GeradorLotofacilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should require the last draw numbers', () => {
    component.gerarJogos('', '3');

    expect(component.mensagem).toBe(
      'Por favor, insira as dezenas do último concurso.',
    );
    expect(component.tipoMensagem).toBe('error');
  });

  it('should reject quantities outside the allowed range', () => {
    const lastDraw = '1,2,3,4,5,6,7,8,9,10,11,12,13,14,15';

    component.gerarJogos(lastDraw, '0');
    expect(component.mensagem).toBe(
      'Informe uma quantidade entre 1 e 50 jogos.',
    );
    expect(component.tipoMensagem).toBe('error');

    component.gerarJogos(lastDraw, '51');
    expect(component.mensagem).toBe(
      'Informe uma quantidade entre 1 e 50 jogos.',
    );
    expect(component.tipoMensagem).toBe('error');
  });

  it('should generate games with 15 unique numbers between 1 and 25', fakeAsync(() => {
    const lastDraw = '1,2,3,4,5,6,7,8,9,10,11,12,13,14,15';

    component.gerarJogos(lastDraw, '2');
    tick(1000);

    expect(component.jogosGerados.length).toBe(2);
    component.jogosGerados.forEach((jogo) => {
      expect(jogo.length).toBe(15);
      expect(new Set(jogo).size).toBe(15);
      jogo.forEach((dezena) => {
        expect(dezena).toBeGreaterThanOrEqual(1);
        expect(dezena).toBeLessThanOrEqual(25);
      });
    });
  }));
});

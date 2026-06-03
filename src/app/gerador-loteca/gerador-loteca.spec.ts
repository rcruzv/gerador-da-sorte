import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeradorLotecaComponent } from './gerador-loteca';

describe('GeradorLotecaComponent', () => {
  let component: GeradorLotecaComponent;
  let fixture: ComponentFixture<GeradorLotecaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeradorLotecaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GeradorLotecaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should expose 14 match positions and three guess options', () => {
    expect(component.partidas.length).toBe(14);
    expect(component.opcoesPalpite).toEqual(['1', 'X', '2']);
  });

  it('should reject quantities outside the allowed range', () => {
    component.gerarJogos('0');
    expect(component.mensagem).toBe(
      'Informe uma quantidade entre 1 e 50 palpites.',
    );
    expect(component.tipoMensagem).toBe('error');

    component.gerarJogos('51');
    expect(component.mensagem).toBe(
      'Informe uma quantidade entre 1 e 50 palpites.',
    );
    expect(component.tipoMensagem).toBe('error');
  });

  it('should generate a matrix of guesses with 14 positions per game', () => {
    component.gerarJogos('3');

    expect(component.palpitesGerados.length).toBe(3);
    component.palpitesGerados.forEach((jogo) => {
      expect(jogo.length).toBe(14);
      jogo.forEach((palpite) => {
        expect(component.opcoesPalpite).toContain(palpite);
      });
    });
    expect(component.mensagem).toBe('Sucesso! 3 palpites gerados.');
    expect(component.tipoMensagem).toBe('success');
  });

  it('should copy guesses separated by comma and space', async () => {
    const writeText = jasmine
      .createSpy('writeText')
      .and.returnValue(Promise.resolve());
    spyOnProperty(navigator, 'clipboard', 'get').and.returnValue({
      writeText,
    } as unknown as Clipboard);

    component.copiarJogo(['1', 'X', '2'], 0);
    await fixture.whenStable();

    expect(writeText).toHaveBeenCalledWith('1, X, 2');
    expect(component.statusCopia[0]).toBe('Copiado!');
  });
});

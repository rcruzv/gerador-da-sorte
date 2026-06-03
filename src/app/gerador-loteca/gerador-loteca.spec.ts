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

  it('should reject invalid quantities', () => {
    component.gerarPalpites('0');
    expect(component.mensagem).toBe(
      'Informe uma quantidade entre 1 e 50 palpites.',
    );
    expect(component.tipoMensagem).toBe('error');

    component.gerarPalpites('51');
    expect(component.mensagem).toBe(
      'Informe uma quantidade entre 1 e 50 palpites.',
    );
    expect(component.tipoMensagem).toBe('error');
  });

  it('should generate guesses with 14 positions', () => {
    component.gerarPalpites('3');

    expect(component.palpitesGerados.length).toBe(3);
    component.palpitesGerados.forEach((palpite) => {
      expect(palpite.length).toBe(14);
    });
  });

  it('should generate guesses containing only valid values', () => {
    const validValues = ['1', 'X', '2'];

    component.gerarPalpites('3');

    component.palpitesGerados.forEach((palpite) => {
      palpite.forEach((resultado) => {
        expect(validValues).toContain(resultado);
      });
    });
  });
});

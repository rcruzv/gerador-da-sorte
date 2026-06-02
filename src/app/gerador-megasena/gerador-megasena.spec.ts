import { ComponentFixture, TestBed } from '@angular/core/testing';

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
});

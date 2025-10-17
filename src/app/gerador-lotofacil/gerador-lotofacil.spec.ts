import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeradorLotofacil } from './gerador-lotofacil';

describe('GeradorLotofacil', () => {
  let component: GeradorLotofacil;
  let fixture: ComponentFixture<GeradorLotofacil>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeradorLotofacil]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeradorLotofacil);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

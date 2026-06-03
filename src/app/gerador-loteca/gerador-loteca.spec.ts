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
});

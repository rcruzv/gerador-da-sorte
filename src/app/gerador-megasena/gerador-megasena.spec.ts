import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeradorMegasena } from './gerador-megasena';

describe('GeradorMegasena', () => {
  let component: GeradorMegasena;
  let fixture: ComponentFixture<GeradorMegasena>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeradorMegasena]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeradorMegasena);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

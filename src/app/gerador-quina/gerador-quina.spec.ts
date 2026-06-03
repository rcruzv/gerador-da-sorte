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
});

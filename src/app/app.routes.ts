import { Routes } from '@angular/router';
import { GeradorMegasenaComponent } from './gerador-megasena/gerador-megasena';
import { GeradorLotofacilComponent } from './gerador-lotofacil/gerador-lotofacil';

export const routes: Routes = [
  { path: 'megasena', component: GeradorMegasenaComponent },
  { path: 'lotofacil', component: GeradorLotofacilComponent },
  { path: '', redirectTo: '/megasena', pathMatch: 'full' }, // Rota padrão
  { path: '**', redirectTo: '/megasena' }, // Rota para qualquer outro caminho
];

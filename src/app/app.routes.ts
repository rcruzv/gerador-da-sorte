import { Routes } from '@angular/router';
import { HomeComponent } from './home/home';
import { EstatisticasComponent } from './estatisticas/estatisticas';
import { GeradorMegasenaComponent } from './gerador-megasena/gerador-megasena';
import { GeradorLotofacilComponent } from './gerador-lotofacil/gerador-lotofacil';
import { GeradorQuinaComponent } from './gerador-quina/gerador-quina';
import { GeradorLotecaComponent } from './gerador-loteca/gerador-loteca';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'megasena', component: GeradorMegasenaComponent },
  { path: 'lotofacil', component: GeradorLotofacilComponent },
  { path: 'estatisticas', component: EstatisticasComponent },
  { path: 'quina', component: GeradorQuinaComponent },
  { path: 'loteca', component: GeradorLotecaComponent },
  { path: '**', redirectTo: '' },
];

import { Routes } from '@angular/router';
import { AuthCallbackComponent } from './auth/auth-callback';
import { AuthPageComponent } from './auth/auth-page';
import { authGuard } from './auth/auth.guard';
import { EstatisticasComponent } from './estatisticas/estatisticas';
import { GeradorLotecaComponent } from './gerador-loteca/gerador-loteca';
import { GeradorLotofacilComponent } from './gerador-lotofacil/gerador-lotofacil';
import { GeradorMegasenaComponent } from './gerador-megasena/gerador-megasena';
import { GeradorQuinaComponent } from './gerador-quina/gerador-quina';
import { HomeComponent } from './home/home';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'auth/login', component: AuthPageComponent, data: { mode: 'login' } },
  { path: 'auth/register', component: AuthPageComponent, data: { mode: 'register' } },
  {
    path: 'auth/forgot-password',
    component: AuthPageComponent,
    data: { mode: 'forgot-password' },
  },
  { path: 'auth/callback', component: AuthCallbackComponent },
  { path: 'estatisticas', component: EstatisticasComponent, canActivate: [authGuard] },
  { path: 'megasena', component: GeradorMegasenaComponent, canActivate: [authGuard] },
  { path: 'lotofacil', component: GeradorLotofacilComponent, canActivate: [authGuard] },
  { path: 'quina', component: GeradorQuinaComponent, canActivate: [authGuard] },
  { path: 'loteca', component: GeradorLotecaComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '' },
];

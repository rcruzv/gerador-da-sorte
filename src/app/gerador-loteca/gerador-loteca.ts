import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-gerador-loteca',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gerador-loteca.html',
  styleUrls: ['./gerador-loteca.css'],
})
export class GeradorLotecaComponent {
  palpitesGerados: string[][] = [];
  mensagem: string = '';
  tipoMensagem: 'success' | 'error' | 'info' = 'info';
  statusCopia: { [key: number]: string } = {};

  private readonly MIN_GAMES = 1;
  private readonly MAX_GAMES = 50;
  private readonly MATCHES_PER_BET = 14;
  private readonly VALID_OUTCOMES = ['1', 'X', '2'];

  gerarPalpites(numGamesStr: string): void {
    const numGames = this.getValidatedGameCount(numGamesStr);
    if (numGames === null) return;

    this.palpitesGerados = Array.from({ length: numGames }, () =>
      this.generateGuess(),
    );
    this.statusCopia = {};
    this.mostrarMensagem(
      `Sucesso! ${this.palpitesGerados.length} palpites gerados.`,
      'success',
    );
  }

  private getValidatedGameCount(numGamesStr: string): number | null {
    const numGames = Number(numGamesStr);
    if (
      !Number.isInteger(numGames) ||
      numGames < this.MIN_GAMES ||
      numGames > this.MAX_GAMES
    ) {
      this.mostrarMensagem(
        'Informe uma quantidade entre 1 e 50 palpites.',
        'error',
      );
      return null;
    }

    return numGames;
  }

  private generateGuess(): string[] {
    return Array.from({ length: this.MATCHES_PER_BET }, () => {
      const index = Math.floor(Math.random() * this.VALID_OUTCOMES.length);
      return this.VALID_OUTCOMES[index];
    });
  }

  private mostrarMensagem(
    texto: string,
    tipo: 'success' | 'error' | 'info',
  ): void {
    this.mensagem = texto;
    this.tipoMensagem = tipo;
  }

  copiarPalpite(palpite: string[], index: number): void {
    const guessString = palpite.join(', ');
    if (!navigator.clipboard?.writeText) {
      this.statusCopia[index] = 'Erro ao copiar';
      this.mostrarMensagem(
        'Não foi possível acessar a área de transferência.',
        'error',
      );
      return;
    }

    navigator.clipboard
      .writeText(guessString)
      .then(() => {
        this.statusCopia[index] = 'Copiado!';
        setTimeout(() => {
          this.statusCopia[index] = 'Copiar';
        }, 2000);
      })
      .catch(() => {
        this.statusCopia[index] = 'Erro ao copiar';
        this.mostrarMensagem('Não foi possível copiar o palpite.', 'error');
      });
  }
}

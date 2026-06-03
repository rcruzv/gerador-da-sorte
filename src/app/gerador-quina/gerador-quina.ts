import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-gerador-quina',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gerador-quina.html',
  styleUrls: ['./gerador-quina.css'],
})
export class GeradorQuinaComponent {
  jogosGerados: number[][] = [];
  mensagem: string = '';
  tipoMensagem: 'success' | 'error' | 'info' = 'info';
  statusCopia: { [key: number]: string } = {};

  private readonly MIN_GAMES = 1;
  private readonly MAX_GAMES = 50;
  private readonly ALL_NUMBERS = Array.from({ length: 80 }, (_, i) => i + 1);

  gerarJogos(numGamesStr: string): void {
    const numGames = this.getValidatedGameCount(numGamesStr);
    if (numGames === null) return;

    this.jogosGerados = [];
    this.statusCopia = {};

    const generatedGames: number[][] = [];
    const generatedGamesSet = new Set<string>();

    while (generatedGames.length < numGames) {
      const sortedGame = this.generateGame();
      const gameKey = sortedGame.join(',');
      if (!generatedGamesSet.has(gameKey)) {
        generatedGames.push(sortedGame);
        generatedGamesSet.add(gameKey);
      }
    }

    this.jogosGerados = generatedGames;
    this.mostrarMensagem(
      `Sucesso! ${this.jogosGerados.length} jogos gerados.`,
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
        'Informe uma quantidade entre 1 e 50 jogos.',
        'error',
      );
      return null;
    }

    return numGames;
  }

  private generateGame(): number[] {
    const numbers = [...this.ALL_NUMBERS];
    for (let i = numbers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }

    return numbers.slice(0, 5).sort((a, b) => a - b);
  }

  private mostrarMensagem(
    texto: string,
    tipo: 'success' | 'error' | 'info',
  ): void {
    this.mensagem = texto;
    this.tipoMensagem = tipo;
  }

  copiarJogo(jogo: number[], index: number): void {
    const gameString = jogo.join(', ');
    if (!navigator.clipboard?.writeText) {
      this.statusCopia[index] = 'Erro ao copiar';
      this.mostrarMensagem(
        'Não foi possível acessar a área de transferência.',
        'error',
      );
      return;
    }

    navigator.clipboard
      .writeText(gameString)
      .then(() => {
        this.statusCopia[index] = 'Copiado!';
        setTimeout(() => {
          this.statusCopia[index] = 'Copiar';
        }, 2000);
      })
      .catch(() => {
        this.statusCopia[index] = 'Erro ao copiar';
        this.mostrarMensagem('Não foi possível copiar o jogo.', 'error');
      });
  }
}

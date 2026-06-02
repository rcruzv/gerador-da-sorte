import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gerador-lotofacil',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gerador-lotofacil.html',
  styleUrls: ['./gerador-lotofacil.css'],
})
export class GeradorLotofacilComponent {
  jogosGerados: number[][] = [];
  mensagem: string = '';
  tipoMensagem: 'success' | 'error' | 'info' = 'info';
  estaGerando: boolean = false;
  statusCopia: { [key: number]: string } = {};

  private readonly MIN_GAMES = 1;
  private readonly MAX_GAMES = 50;
  private readonly MAX_ATTEMPTS = 500000;
  private readonly ATTEMPTS_PER_BATCH = 5000;
  private readonly ALL_NUMBERS = new Set(
    Array.from({ length: 25 }, (_, i) => i + 1),
  );
  private readonly ODD_NUMBERS = new Set([
    1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25,
  ]);
  private readonly FRAME_NUMBERS = new Set([
    1, 2, 3, 4, 5, 6, 10, 11, 15, 16, 20, 21, 22, 23, 24, 25,
  ]);
  private readonly PRIME_NUMBERS = new Set([2, 3, 5, 7, 11, 13, 17, 19, 23]);

  private getValidatedLastDraw(lastDrawStr: string): Set<number> | null {
    if (!lastDrawStr) {
      this.mostrarMensagem(
        'Por favor, insira as dezenas do último concurso.',
        'error',
      );
      return null;
    }
    const numbers = lastDrawStr
      .split(',')
      .map((n) => parseInt(n.trim(), 10))
      .filter((n) => !isNaN(n) && n >= 1 && n <= 25);
    const uniqueNumbers = new Set(numbers);
    if (uniqueNumbers.size !== 15) {
      this.mostrarMensagem(
        `Você inseriu ${uniqueNumbers.size} dezenas válidas. São necessárias 15.`,
        'error',
      );
      return null;
    }
    return uniqueNumbers;
  }

  gerarJogos(lastDrawStr: string, numGamesStr: string): void {
    const lastDraw = this.getValidatedLastDraw(lastDrawStr);
    if (!lastDraw) return;

    const numGames = this.getValidatedGameCount(numGamesStr);
    if (numGames === null) return;

    this.estaGerando = true;
    this.jogosGerados = [];
    this.statusCopia = {};
    this.mostrarMensagem('Buscando combinações filtradas...', 'info');

    const generatedGames: number[][] = [];
    const generatedGamesSet = new Set<string>();
    let attempts = 0;

    const processBatch = () => {
      const batchLimit = Math.min(
        attempts + this.ATTEMPTS_PER_BATCH,
        this.MAX_ATTEMPTS,
      );

      while (generatedGames.length < numGames && attempts < batchLimit) {
        const candidate = this.generateCandidate();
        if (this.isGameValid(candidate, lastDraw)) {
          const sortedGame = Array.from(candidate).sort((a, b) => a - b);
          const gameKey = sortedGame.join(',');
          if (!generatedGamesSet.has(gameKey)) {
            generatedGames.push(sortedGame);
            generatedGamesSet.add(gameKey);
          }
        }
        attempts++;
      }

      if (generatedGames.length < numGames && attempts < this.MAX_ATTEMPTS) {
        setTimeout(processBatch, 0);
        return;
      }

      this.jogosGerados = generatedGames;
      this.estaGerando = false;

      if (this.jogosGerados.length < numGames) {
        this.mostrarMensagem(
          `Encontrados ${this.jogosGerados.length} de ${numGames} jogos.`,
          'info',
        );
      } else {
        this.mostrarMensagem(
          `Sucesso! ${this.jogosGerados.length} jogos gerados.`,
          'success',
        );
      }
    };

    setTimeout(processBatch, 0);
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

  private isGameValid(candidate: Set<number>, lastDraw: Set<number>): boolean {
    const countIntersection = (setA: Set<number>, setB: Set<number>) => {
      let count = 0;
      for (const elem of setA) {
        if (setB.has(elem)) count++;
      }
      return count;
    };
    const repeatedCount = countIntersection(candidate, lastDraw);
    if (![8, 9, 10].includes(repeatedCount)) return false;
    const oddCount = countIntersection(candidate, this.ODD_NUMBERS);
    if (![7, 8].includes(oddCount)) return false;
    const frameCount = countIntersection(candidate, this.FRAME_NUMBERS);
    if (![9, 10, 11].includes(frameCount)) return false;
    const primeCount = countIntersection(candidate, this.PRIME_NUMBERS);
    if (![4, 5, 6].includes(primeCount)) return false;
    const sum = Array.from(candidate).reduce((acc, val) => acc + val, 0);
    if (sum < 185 || sum > 220) return false;
    return true;
  }

  private generateCandidate(): Set<number> {
    const numbers = Array.from(this.ALL_NUMBERS);
    for (let i = numbers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }
    return new Set(numbers.slice(0, 15));
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

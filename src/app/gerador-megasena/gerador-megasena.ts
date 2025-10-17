import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importe o CommonModule

@Component({
  selector: 'app-gerador-megasena',
  standalone: true, // Adicione standalone: true
  imports: [CommonModule], // Adicione CommonModule aos imports
  templateUrl: './gerador-megasena.html',
  styleUrls: ['./gerador-megasena.css'],
})
export class GeradorMegasenaComponent {
  // Propriedades para controlar o estado da UI
  jogosGerados: number[][] = [];
  mensagem: string = '';
  tipoMensagem: 'success' | 'error' | 'info' = 'info';
  estaGerando: boolean = false;
  statusCopia: { [key: number]: string } = {};

  // Constantes estatísticas
  private readonly ALL_NUMBERS = Array.from({ length: 60 }, (_, i) => i + 1);
  private readonly ODD_NUMBERS = new Set(
    this.ALL_NUMBERS.filter((n) => n % 2 !== 0)
  );
  private readonly QUADRANTS = [
    new Set([1, 2, 3, 4, 5, 11, 12, 13, 14, 15, 21, 22, 23, 24, 25]),
    new Set([6, 7, 8, 9, 10, 16, 17, 18, 19, 20, 26, 27, 28, 29, 30]),
    new Set([31, 32, 33, 34, 35, 41, 42, 43, 44, 45, 51, 52, 53, 54, 55]),
    new Set([36, 37, 38, 39, 40, 46, 47, 48, 49, 50, 56, 57, 58, 59, 60]),
  ];

  // Método principal chamado pelo botão
  gerarJogos(numGamesStr: string): void {
    const numGames = parseInt(numGamesStr, 10);
    if (isNaN(numGames) || numGames < 1) {
      this.mostrarMensagem('Quantidade de jogos inválida.', 'error');
      return;
    }

    this.estaGerando = true;
    this.jogosGerados = [];
    this.mostrarMensagem('Buscando as melhores combinações...', 'info');

    // Usar setTimeout para não travar a UI
    setTimeout(() => {
      const generatedGames = [];
      const generatedGamesSet = new Set<string>();
      let attempts = 0;
      const maxAttempts = 1000000;

      while (generatedGames.length < numGames && attempts < maxAttempts) {
        const candidate = this.generateCandidate();
        if (this.isGameValid(candidate)) {
          const sortedGame = Array.from(candidate).sort((a, b) => a - b);
          const gameKey = sortedGame.join(',');
          if (!generatedGamesSet.has(gameKey)) {
            generatedGames.push(sortedGame);
            generatedGamesSet.add(gameKey);
          }
        }
        attempts++;
      }

      this.jogosGerados = generatedGames;
      this.estaGerando = false;

      if (this.jogosGerados.length < numGames) {
        this.mostrarMensagem(
          `Encontrados ${this.jogosGerados.length} de ${numGames} jogos. Tente novamente.`,
          'info'
        );
      } else {
        this.mostrarMensagem(
          `Sucesso! ${this.jogosGerados.length} jogos gerados.`,
          'success'
        );
      }
    }, 50);
  }

  private mostrarMensagem(
    texto: string,
    tipo: 'success' | 'error' | 'info'
  ): void {
    this.mensagem = texto;
    this.tipoMensagem = tipo;
  }

  private generateCandidate(): Set<number> {
    const numbers = [...this.ALL_NUMBERS];
    for (let i = numbers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }
    return new Set(numbers.slice(0, 6));
  }

  private isGameValid(candidate: Set<number>): boolean {
    const gameArray = Array.from(candidate);
    const countIntersection = (setA: Set<number>, setB: Set<number>) => {
      let count = 0;
      setA.forEach((elem) => {
        if (setB.has(elem)) count++;
      });
      return count;
    };

    const oddCount = countIntersection(candidate, this.ODD_NUMBERS);
    if (![2, 3, 4].includes(oddCount)) return false;

    const sum = gameArray.reduce((acc, val) => acc + val, 0);
    if (sum < 160 || sum > 240) return false;

    let quadrantsUsed = 0;
    this.QUADRANTS.forEach((q) => {
      if (countIntersection(candidate, q) > 0) quadrantsUsed++;
    });
    if (quadrantsUsed < 3) return false;

    const getLine = (num: number) => Math.floor((num - 1) / 10);
    const getCol = (num: number) => (num - 1) % 10;
    const lines = new Map<number, number>();
    const cols = new Map<number, number>();
    for (const num of gameArray) {
      const line = getLine(num);
      const col = getCol(num);
      lines.set(line, (lines.get(line) || 0) + 1);
      cols.set(col, (cols.get(col) || 0) + 1);
    }
    if (Array.from(lines.values()).some((count) => count > 2)) return false;
    if (Array.from(cols.values()).some((count) => count > 2)) return false;

    return true;
  }

  copiarJogo(jogo: number[], index: number): void {
    const gameString = jogo.join(', ');
    navigator.clipboard.writeText(gameString).then(() => {
      this.statusCopia[index] = 'Copiado!';
      setTimeout(() => {
        this.statusCopia[index] = 'Copiar';
      }, 2000);
    });
  }
}

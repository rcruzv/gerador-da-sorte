import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

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
  estaGerando: boolean = false;
  statusCopia: { [key: number]: string } = {};

  readonly partidas = Array.from({ length: 14 }, (_, i) => `Jogo ${i + 1}`);
  readonly opcoesPalpite = ['1', 'X', '2'];

  private readonly MIN_GAMES = 1;
  private readonly MAX_GAMES = 50;

  gerarJogos(numGamesStr: string): void {
    const numGames = this.getValidatedGameCount(numGamesStr);
    if (numGames === null) return;

    this.estaGerando = true;
    this.palpitesGerados = [];
    this.statusCopia = {};
    this.mostrarMensagem('Gerando palpites por confronto...', 'info');

    const generatedGames: string[][] = [];
    const generatedGamesSet = new Set<string>();

    while (generatedGames.length < numGames) {
      const palpite = this.generateCandidate();
      const palpiteKey = palpite.join(',');

      if (!generatedGamesSet.has(palpiteKey)) {
        generatedGames.push(palpite);
        generatedGamesSet.add(palpiteKey);
      }
    }

    this.palpitesGerados = generatedGames;
    this.estaGerando = false;
    this.mostrarMensagem(
      `Sucesso! ${this.palpitesGerados.length} palpites gerados.`,
      'success',
    );
  }

  copiarJogo(jogo: string[], index: number): void {
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
        this.mostrarMensagem('Não foi possível copiar o palpite.', 'error');
      });
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

  private generateCandidate(): string[] {
    return this.partidas.map(() => {
      const optionIndex = Math.floor(Math.random() * this.opcoesPalpite.length);
      return this.opcoesPalpite[optionIndex];
    });
  }

  private mostrarMensagem(
    texto: string,
    tipo: 'success' | 'error' | 'info',
  ): void {
    this.mensagem = texto;
    this.tipoMensagem = tipo;
  }
}

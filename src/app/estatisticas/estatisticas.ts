import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

type LotteryKey = 'mega' | 'loto';

interface HeatCell {
  number: number;
  intensity: number;
}

interface StatsDataset {
  label: string;
  title: string;
  range: string;
  parity: string;
  sumRange: string;
  sumDescription: string;
  minSum: number;
  maxSum: number;
  frequentNumbers: number[];
  heatmap: HeatCell[];
  quadrants: Array<{
    label: string;
    value: number;
    delta: number;
  }>;
}

@Component({
  selector: 'app-estatisticas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './estatisticas.html',
  styleUrl: './estatisticas.css',
})
export class EstatisticasComponent {
  protected selectedLottery: LotteryKey = 'mega';

  protected readonly datasets: Record<LotteryKey, StatsDataset> = {
    mega: {
      label: 'Mega-Sena',
      title: 'Mega-Sena',
      range: '01 a 60',
      parity: '3:3',
      sumRange: '151-200',
      sumDescription: 'Faixa demonstrativa comum para análise visual.',
      minSum: 58,
      maxSum: 302,
      frequentNumbers: [1, 5, 10, 13, 23, 33, 42, 53, 60],
      heatmap: this.createHeatmap(60, [3, 10, 13, 16, 18, 27, 28, 31, 35, 42, 47, 60]),
      quadrants: [
        { label: 'Superior esquerdo', value: 28, delta: -3 },
        { label: 'Superior direito', value: 32, delta: 2 },
        { label: 'Inferior esquerdo', value: 24, delta: -6 },
        { label: 'Inferior direito', value: 36, delta: 5 },
      ],
    },
    loto: {
      label: 'Lotofácil',
      title: 'Lotofácil',
      range: '01 a 25',
      parity: '8:7',
      sumRange: '185-220',
      sumDescription: 'Faixa usada pelos filtros reais da Lotofácil.',
      minSum: 120,
      maxSum: 300,
      frequentNumbers: [1, 3, 4, 7, 8, 9, 11, 12, 15, 17, 19, 20, 22, 24, 25],
      heatmap: this.createHeatmap(25, [1, 3, 7, 8, 11, 12, 15, 19, 20, 22, 24, 25]),
      quadrants: [
        { label: 'Linha superior', value: 31, delta: 1 },
        { label: 'Centro', value: 29, delta: -2 },
        { label: 'Moldura', value: 40, delta: 4 },
        { label: 'Miolo', value: 21, delta: -3 },
      ],
    },
  };

  protected get activeDataset(): StatsDataset {
    return this.datasets[this.selectedLottery];
  }

  protected selectLottery(lottery: LotteryKey): void {
    this.selectedLottery = lottery;
  }

  protected getHeatStyle(cell: HeatCell): Record<string, string> {
    return {
      background: `rgba(0, 74, 198, ${0.1 + cell.intensity * 0.75})`,
      color: cell.intensity > 0.58 ? '#ffffff' : '#0f172a',
    };
  }

  private createHeatmap(total: number, highlights: number[]): HeatCell[] {
    const highlightSet = new Set(highlights);
    return Array.from({ length: total }, (_, index) => {
      const number = index + 1;
      const base = ((number * 17) % 41) / 100;
      return {
        number,
        intensity: highlightSet.has(number) ? 0.74 + (number % 4) * 0.06 : 0.22 + base,
      };
    });
  }
}

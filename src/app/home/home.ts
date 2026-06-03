import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomeComponent {
  protected readonly recommendedNumbers = [5, 14, 27, 33, 48, 59];
  protected readonly featureCards = [
    {
      title: 'Filtros estatísticos',
      description:
        'Use critérios populares como soma, paridade, moldura e distribuição no volante.',
      icon: 'FL',
    },
    {
      title: 'Geração assíncrona',
      description:
        'Os jogos são processados em lotes para manter a interface responsiva.',
      icon: 'AS',
    },
    {
      title: 'Histórico local',
      description:
        'A estrutura visual está preparada para histórico e conferência futura de jogos.',
      icon: 'HI',
    },
    {
      title: 'Análise demonstrativa',
      description:
        'As estatísticas ajudam a visualizar padrões sem prometer vantagem matemática.',
      icon: 'AD',
    },
  ];
}

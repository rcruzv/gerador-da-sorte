# Gerador da Sorte

Aplicação Angular para gerar combinações de Mega-Sena e Lotofácil usando filtros estatísticos populares, como equilíbrio entre pares e ímpares, soma das dezenas, distribuição no volante e repetição de dezenas do concurso anterior no caso da Lotofácil.

> **Importante:** os filtros aplicados não garantem prêmio e não aumentam a probabilidade matemática de uma combinação específica ser sorteada. Em uma loteria justa, cada combinação válida tem a mesma chance de ocorrer. O objetivo do projeto é apenas evitar padrões considerados pouco desejáveis por critérios estatísticos comuns.

## Modalidades disponíveis

### Mega-Sena

Gera jogos com 6 dezenas entre 1 e 60 aplicando os seguintes filtros:

- 2, 3 ou 4 dezenas ímpares;
- soma total entre 160 e 240;
- dezenas distribuídas em pelo menos 3 dos 4 quadrantes do volante;
- no máximo 2 dezenas na mesma linha ou coluna.

### Lotofácil

Gera jogos com 15 dezenas entre 1 e 25. Para usar essa modalidade, informe as 15 dezenas do último concurso. Os filtros aplicados são:

- 8, 9 ou 10 dezenas repetidas do concurso anterior;
- 7 ou 8 dezenas ímpares;
- 9, 10 ou 11 dezenas na moldura;
- 4, 5 ou 6 dezenas primas;
- soma total entre 185 e 220.

## Como executar

Instale as dependências:

```bash
npm install
```

Inicie o servidor de desenvolvimento:

```bash
npm start
```

Acesse `http://localhost:4200/` no navegador.

## Build

```bash
npm run build
```

Os artefatos serão gerados em `dist/`.

## Testes

```bash
npm test -- --watch=false --browsers=ChromeHeadless
```

## Observações técnicas

- O projeto usa Angular 20.
- A geração é feita em lotes assíncronos para reduzir travamentos perceptíveis na interface.
- A quantidade de jogos é limitada entre 1 e 50 por geração.
- A aplicação não depende mais de Tailwind via CDN nem de Google Fonts no `index.html`; os estilos necessários foram definidos localmente.

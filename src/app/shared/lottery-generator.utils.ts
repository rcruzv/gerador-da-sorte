export type NumberGame = number[];
export type NumberCandidate = Set<number>;

interface GenerateUniqueNumberGamesOptions {
  requestedGames: number;
  maxAttempts: number;
  attemptsPerBatch: number;
  generateCandidate: () => NumberCandidate;
  isGameValid: (candidate: NumberCandidate) => boolean;
  onComplete: (games: NumberGame[]) => void;
}

export function createNumberRange(maxNumber: number): number[] {
  return Array.from({ length: maxNumber }, (_, index) => index + 1);
}

export function shuffleNumbers(numbers: Iterable<number>): number[] {
  const shuffled = Array.from(numbers);

  for (let index = shuffled.length - 1; index > 0; index--) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [
      shuffled[randomIndex],
      shuffled[index],
    ];
  }

  return shuffled;
}

export function generateCandidateNumbers(
  numbers: Iterable<number>,
  quantity: number,
): NumberCandidate {
  return new Set(shuffleNumbers(numbers).slice(0, quantity));
}

export function validateGameCount(
  value: string,
  minGames: number,
  maxGames: number,
): number | null {
  const games = Number(value);

  if (!Number.isInteger(games) || games < minGames || games > maxGames) {
    return null;
  }

  return games;
}

export function countIntersection(
  firstSet: Set<number>,
  secondSet: Set<number>,
): number {
  let count = 0;

  for (const value of firstSet) {
    if (secondSet.has(value)) count++;
  }

  return count;
}

export function sortGame(game: Iterable<number>): NumberGame {
  return Array.from(game).sort((first, second) => first - second);
}

export function formatGameForCopy(game: NumberGame): string {
  return game.join(', ');
}

export function generateUniqueNumberGames({
  requestedGames,
  maxAttempts,
  attemptsPerBatch,
  generateCandidate,
  isGameValid,
  onComplete,
}: GenerateUniqueNumberGamesOptions): void {
  const generatedGames: NumberGame[] = [];
  const generatedGamesSet = new Set<string>();
  let attempts = 0;

  const processBatch = () => {
    const batchLimit = Math.min(attempts + attemptsPerBatch, maxAttempts);

    while (generatedGames.length < requestedGames && attempts < batchLimit) {
      const candidate = generateCandidate();

      if (isGameValid(candidate)) {
        const sortedGame = sortGame(candidate);
        const gameKey = sortedGame.join(',');

        if (!generatedGamesSet.has(gameKey)) {
          generatedGames.push(sortedGame);
          generatedGamesSet.add(gameKey);
        }
      }

      attempts++;
    }

    if (generatedGames.length < requestedGames && attempts < maxAttempts) {
      setTimeout(processBatch, 0);
      return;
    }

    onComplete(generatedGames);
  };

  setTimeout(processBatch, 0);
}

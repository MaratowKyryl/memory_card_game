export enum eDifficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}

export interface iCard {
  id: number;
  pairId: number;
  isFlipped: boolean;
  isGuessed: boolean;
  imageId: string;
}

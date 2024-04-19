export enum eDifficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}

export interface iCard {
  id: number;
  pairId: number;
  flipped: boolean;
  imageId: string;
}

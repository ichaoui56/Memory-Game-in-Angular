import { SequenceModel } from './sequence.model';

export interface GameState {
  sequence: SequenceModel[];
  userSequence: SequenceModel[];
  currentLevel: number;
  currentScore: number;
  isGameOver: boolean;
  isPlayback: boolean;
}
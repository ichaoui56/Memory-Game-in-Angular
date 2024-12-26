import { Injectable } from '@angular/core';
import { GameState, GameSettings, SequenceModel } from '../models';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private gameState = new BehaviorSubject<GameState>({
    sequence: [],
    userSequence: [],
    currentLevel: 1,
    currentScore: 0,
    isGameOver: false,
    isPlayback: false
  });

  private readonly gameSettings: GameSettings = {
    initialLevel: 1,
    basePointsPerLevel: 10,
    countdownDuration: 2,
    animationDelay: 1000,
    timeBonus: {
      fast: 2.0,
      normal: 1.5,
      slow: 1.0
    }
  };

  getGameState(): Observable<GameState> {
    return this.gameState.asObservable();
  }

  getCurrentState(): GameState {
    return this.gameState.getValue();
  }

  updateState(newState: Partial<GameState>): void {
    this.gameState.next({
      ...this.getCurrentState(),
      ...newState
    });
  }

  getGameSettings(): GameSettings {
    return this.gameSettings;
  }

  resetGame(): void {
    this.updateState({
      sequence: [],
      userSequence: [],
      currentLevel: this.gameSettings.initialLevel,
      currentScore: 0,
      isGameOver: false,
      isPlayback: false
    });
  }

  addUserMove(card: SequenceModel): void {
    const currentState = this.getCurrentState();
    this.updateState({
      userSequence: [...currentState.userSequence, card]
    });
  }

  resetUserSequence(): void {
    this.updateState({ userSequence: [] });
  }

  calculatePoints(timeTaken: number): {
    points: number;
    timeBonus: number;
    speedCategory: 'FAST' | 'NORMAL' | 'SLOW';
  } {
    const basePoints = this.gameSettings.basePointsPerLevel;
    let timeBonus = this.gameSettings.timeBonus.slow;
    let speedCategory: 'FAST' | 'NORMAL' | 'SLOW' = 'SLOW';

    if (timeTaken < 2) {
      timeBonus = this.gameSettings.timeBonus.fast;
      speedCategory = 'FAST';
    } else if (timeTaken < 4) {
      timeBonus = this.gameSettings.timeBonus.normal;
      speedCategory = 'NORMAL';
    }

    return {
      points: Math.round(basePoints * timeBonus),
      timeBonus,
      speedCategory
    };
  }

  shuffleSequence(array: SequenceModel[]): SequenceModel[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  handleLevelComplete(timeTaken: number): void {
    const currentState = this.getCurrentState();
    const { points } = this.calculatePoints(timeTaken);

    this.updateState({
      currentScore: currentState.currentScore + points,
      currentLevel: currentState.currentLevel + 1,
      userSequence: []
    });
  }

  triggerGameOver(): void {
    this.updateState({ isGameOver: true });
  }
}

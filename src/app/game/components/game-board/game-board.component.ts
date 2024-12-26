import { Component, OnInit, OnDestroy } from '@angular/core';
import { SequenceService } from '../../services/sequence/sequence.service';
import { GameState, GameSettings, SequenceModel } from '../../../core/models';

@Component({
  selector: 'app-game-board',
  standalone: false,
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css'],
})
export class GameBoardComponent implements OnInit, OnDestroy {
  // Game state
  gameState: GameState = {
    sequence: [],
    userSequence: [],
    currentLevel: 1,
    currentScore: 0,
    isGameOver: false,
    isPlayback: false
  };

  // Game settings
  readonly gameSettings: GameSettings = {
    initialLevel: 1,
    pointsPerLevel: 10,
    countdownDuration: 5,
    animationDelay: 1000
  };

  // UI state
  countdown: number = this.gameSettings.countdownDuration;
  disable: boolean = true;
  activeCardIndex: number | null = null;
  private countdownInterval?: number;

  constructor(private sequenceService: SequenceService) {}

  ngOnInit(): void {
    this.startGame();
  }

  ngOnDestroy(): void {
    this.clearCountdown();
  }

  // Game Logic Methods
  public startGame(): void {
    this.resetGameState();
    this.startNextLevel();
  }

  private resetGameState(): void {
    this.gameState = {
      sequence: [],
      userSequence: [],
      currentLevel: this.gameSettings.initialLevel,
      currentScore: 0,
      isGameOver: false,
      isPlayback: false
    };
    this.sequenceService.resetGame();
  }

  startNextLevel(): void {
    this.disable = true;
    this.gameState.userSequence = [];
    this.generateNewSequence();
    this.startCountdown();
    this.playSequenceAnimation();
  }

  private generateNewSequence(): void {
    this.sequenceService.ajouterCouleur();
    this.gameState.sequence = this.sequenceService.getSequence();
    this.gameState.sequence = this.shuffleSequence([...this.gameState.sequence]);
  }

  // Sequence Handling
  getClickedCard(card: SequenceModel): void {
    if (this.gameState.isGameOver || this.disable) return;
    
    this.gameState.userSequence.push(card);
  }

  resetUserSequence(): void {
    this.gameState.userSequence = [];
  }

  validateSequence(): void {
    const isValid = this.sequenceService.verifierReponse(this.gameState.userSequence);
    
    if (isValid) {
      this.handleCorrectSequence();
    } else {
      this.triggerGameOver();
    }
  }

  private handleCorrectSequence(): void {
    this.gameState.currentLevel++;
    this.updateScore();
    this.startNextLevel();
  }

  private updateScore(): void {
    this.gameState.currentScore += this.gameSettings.pointsPerLevel;
  }

  // Animation and UI Methods
  private playSequenceAnimation(): void {
    const sortedSequence = [...this.gameState.sequence].sort((a, b) => a.order - b.order);
    let index = 0;

    const interval = setInterval(() => {
      if (index < sortedSequence.length) {
        this.activeCardIndex = sortedSequence[index].order;
        index++;
      } else {
        clearInterval(interval);
        this.activeCardIndex = null;
      }
    }, this.gameSettings.animationDelay);
  }

  private startCountdown(): void {
    this.clearCountdown();
    this.countdown = this.gameSettings.countdownDuration;
    
    this.countdownInterval = window.setInterval(() => {
      if (this.countdown > 0) {
        this.countdown--;
      } else {
        this.clearCountdown();
        this.disable = false;
      }
    }, 1000);
  }

  private clearCountdown(): void {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
  }

  private triggerGameOver(): void {
    this.gameState.isGameOver = true;
    this.disable = true;
    this.clearCountdown();
  }

  private shuffleSequence(array: SequenceModel[]): SequenceModel[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // Getters for template
  get score(): number {
    return this.gameState.currentScore;
  }

  get level(): number {
    return this.gameState.currentLevel;
  }

  get isGameOver(): boolean {
    return this.gameState.isGameOver;
  }

  get sequence(): SequenceModel[] {
    return this.gameState.sequence;
  }

  get userSequence(): SequenceModel[] {
    return this.gameState.userSequence;
  }
}

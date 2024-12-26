import { Component, OnInit, OnDestroy } from '@angular/core';
import { SequenceService } from '../../services/sequence/sequence.service';
import { sequenceType } from '../../sequenceType';

@Component({
  selector: 'app-game-board',
  standalone: false,
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css'],
})
export class GameBoardComponent implements OnInit, OnDestroy {
  // Game state
  sequence: sequenceType[] = [];
  userSequence: sequenceType[] = [];
  level: number = 1;
  score: number = 0;
  isGameOver: boolean = false;

  // UI state
  countdown: number = 5;
  disable: boolean = true;
  activeCardIndex: number | null = null;
  private countdownInterval?: number;
  private readonly COUNTDOWN_START = 5;
  private readonly ANIMATION_DELAY = 1000;

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
    this.level = 1;
    this.score = 0;
    this.isGameOver = false;
    this.userSequence = [];
    this.sequenceService.resetGame();
  }

  startNextLevel(): void {
    this.disable = true;
    this.userSequence = [];
    this.generateNewSequence();
    this.startCountdown();
    this.playSequenceAnimation();
  }

  private generateNewSequence(): void {
    this.sequenceService.ajouterCouleur();
    this.sequence = this.sequenceService.getSequence();
    this.sequence = this.shuffleSequence([...this.sequence]);
  }

  // Sequence Handling
  getClickedCard(card: sequenceType): void {
    if (this.isGameOver || this.disable) return;
    
    this.userSequence.push(card);
  }

  resetUserSequence(): void {
    this.userSequence = [];
  }

  validateSequence(): void {
    const isValid = this.sequenceService.verifierReponse(this.userSequence);
    
    if (isValid) {
      this.handleCorrectSequence();
    } else {
      this.triggerGameOver();
    }
  }

  private handleCorrectSequence(): void {
    this.level++;
    this.updateScore();
    this.startNextLevel();
  }

  private updateScore(): void {
    this.score += 10;
  }

  // Animation and UI Methods
  private playSequenceAnimation(): void {
    const sortedSequence = [...this.sequence].sort((a, b) => a.order - b.order);
    let index = 0;

    const interval = setInterval(() => {
      if (index < sortedSequence.length) {
        this.activeCardIndex = sortedSequence[index].order;
        index++;
      } else {
        clearInterval(interval);
        this.activeCardIndex = null;
      }
    }, this.ANIMATION_DELAY);
  }

  private startCountdown(): void {
    this.clearCountdown();
    this.countdown = this.COUNTDOWN_START;
    
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
    this.isGameOver = true;
    this.disable = true;
    this.clearCountdown();
  }

  private shuffleSequence(array: sequenceType[]): sequenceType[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../../../core/services/game.service';
import { ScoreService } from '../../../core/services/score.service';
import { SequenceService } from '../../services/sequence/sequence.service';
import { GameState, GameSettings, SequenceModel } from '../../../core/models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-game-board',
  standalone: false,
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css'],
})
export class GameBoardComponent implements OnInit, OnDestroy {
  gameState!: GameState;
  readonly gameSettings: GameSettings;
  private subscription: Subscription = new Subscription();

  countdown: number;
  disable: boolean = true;
  activeCardIndex: number | null = null;
  private countdownInterval?: number;
  private sequenceStartTime?: number;
  highScore: number = 0;
  playerName: string | null = null;
  currentScore: number = 0;
  currentLevel: number = 1;
  showModal: boolean = false;
  cards: any[] = []; // Replace with your card interface

  constructor(
    private gameService: GameService,
    private sequenceService: SequenceService,
    private scoreService: ScoreService,
    private router: Router
  ) {
    this.gameSettings = this.gameService.getGameSettings();
    this.countdown = this.gameSettings.countdownDuration;
    this.highScore = this.scoreService.getCurrentHighScore();
    this.playerName = localStorage.getItem('playerName');
    if (!this.playerName) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.subscription.add(
      this.gameService.getGameState().subscribe(state => {
        this.gameState = state;
      })
    );

    this.subscription.add(
      this.scoreService.getHighScore().subscribe(score => {
        this.highScore = score;
      })
    );

    this.startGame();
  }

  ngOnDestroy(): void {
    this.clearCountdown();
    this.subscription.unsubscribe();
  }

  startGame(): void {
    this.sequenceService.resetSequence();
    this.gameService.resetGame();
    this.startNextLevel();
  }

  startNextLevel(): void {
    this.disable = true;
    this.generateNewSequence();
    this.startCountdown();
    this.playSequenceAnimation();
  }

  getClickedCard(card: SequenceModel): void {
    if (!this.gameState.isGameOver && !this.disable) {
      this.gameService.addUserMove(card);
    }
  }

  validateSequence(): void {
    const isValid = this.sequenceService.verifierReponse(this.gameState.userSequence);

    if (isValid) {
      const timeTaken = this.calculateTimeTaken();
      this.gameService.handleLevelComplete(timeTaken);
      this.startNextLevel();
    } else {
      this.handleGameOver();
    }
  }

  private handleGameOver(): void {
    this.gameService.triggerGameOver();
    this.disable = true;
    this.clearCountdown();
    
    this.scoreService.addScore({
      finalScore: this.gameState.currentScore,
      maxLevel: this.gameState.currentLevel,
      timestamp: new Date()
    });
  }

  private generateNewSequence(): void {
    if (this.gameState.currentLevel > 1) {
      this.sequenceService.ajouterCouleur();
    }
    const sequence = this.sequenceService.getSequence();
    const shuffledSequence = this.gameService.shuffleSequence([...sequence]);
    this.gameService.updateState({ sequence: shuffledSequence });
  }

  // UI Methods
  private startCountdown(): void {
    this.clearCountdown();
    this.countdown = this.gameSettings.countdownDuration;
    
    this.countdownInterval = window.setInterval(() => {
      if (this.countdown > 0) {
        this.countdown--;
      } else {
        this.clearCountdown();
        this.disable = false;
        this.sequenceStartTime = Date.now();
      }
    }, 1000);
  }

  private playSequenceAnimation(): void {
    const sortedSequence = [...this.gameState.sequence].sort(
      (a, b) => a.order - b.order
    );
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

  private calculateTimeTaken(): number {
    if (!this.sequenceStartTime) return 0;
    return (Date.now() - this.sequenceStartTime) / 1000;
  }

  private clearCountdown(): void {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
  }

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

  resetUserSequence(): void {
    this.gameService.resetUserSequence();
  }

  onCardClick(index: number) {
    // Handle card click logic
  }

  restartGame() {
    this.startGame();
  }

  showInstructions() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }
}

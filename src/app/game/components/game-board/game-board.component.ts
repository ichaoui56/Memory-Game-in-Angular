import { Component, OnInit } from '@angular/core';
import { SequenceService } from '../../services/sequence/sequence.service';
import { sequenceType } from '../../sequenceType';

@Component({
  selector: 'app-game-board',
  standalone: false,
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css'],
})
export class GameBoardComponent implements OnInit {
  sequence: sequenceType[] = [];
  userSequence: sequenceType[] = [];
  level: number = 1;
  score: number = 0;
  isGameOver: boolean = false;
  countdown: number = 5;
  countdownInterval: any;
  disable: boolean = true; // Cards are disabled initially
  activeCardIndex: number | null = null; // Track the active card for animation

  constructor(private sequenceService: SequenceService) {}

  ngOnInit(): void {
    this.startNextLevel();
  }

  // initializeGame(): void {
  //   this.sequenceService.resetGame();
  //   this.sequenceService.ajouterCouleur();
  //   this.sequenceService.ajouterCouleur();
  //   this.sequence = this.sequenceService.getSequence();
  //   console.log('Game initialized with sequence:', this.sequence);
  //   this.animateSequence();
  //   this.startCountdown(); // Start countdown as soon as the game initializes
  // }

  startCountdown(): void {
    this.countdown = 5;
    this.countdownInterval = setInterval(() => {
      if (this.countdown > 0) {
        this.countdown--; // Decrease countdown
      } else {
        clearInterval(this.countdownInterval); // Stop countdown
        this.disable = false; // Enable the cards after countdown ends
      }
    }, 1000); // 1 second interval
  }

  animateSequence(sequence: sequenceType[]): void {
    // Create a copy of the original sequence before shuffling
    const originalSequence = [...sequence].sort((a, b) => a.order - b.order);

    let index = 0;

    const interval = setInterval(() => {
      if (index < originalSequence.length) {
        // Find the index in the shuffled sequence that matches the current order
        const currentOrder = originalSequence[index].order;
        this.activeCardIndex = currentOrder;
        index++;
      } else {
        clearInterval(interval);
        this.activeCardIndex = null;
      }
    }, 1000);
  }

  getClickedCard(card: sequenceType): void {
    if (this.isGameOver) {
      console.log('Game is over. Restart to play again.');
      return;
    }

    if (this.disable) {
      console.log('Cards are disabled, please wait until countdown finishes.');
      return;
    }

    this.userSequence.push(card);
    console.log('User Sequence:', this.userSequence);
  }

  resetUserSequence(): void {
    this.userSequence = [];
  }

  startNextLevel(): void {
    this.disable = true;
    this.startCountdown();
    this.sequenceService.ajouterCouleur();
    this.sequence = this.sequenceService.getSequence();
    // Animate before shuffling
    this.animateSequence(this.sequence);
    // Shuffle after animation starts
    this.sequence = this.shuffle(this.sequence);
    console.log('New Sequence:', this.sequence);
  }

  validateSequence(): void {
    const isValid: boolean = this.sequenceService.verifierReponse(
      this.userSequence
    );
    if (isValid) {
      console.log('Sequence validated successfully');
      this.level++;
      this.score += 10;
      this.resetUserSequence();
      this.startNextLevel();
    } else {
      console.log('Validation failed: Incorrect sequence');
      this.triggerGameOver();
    }
  }

  triggerGameOver(): void {
    this.isGameOver = true;
    console.log('Game Over! Final Score:', this.score);
  }

  shuffle = (array: sequenceType[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  // restartGame(): void {
  //   this.isGameOver = false;
  //   this.countdown = 5; // Reset countdown to 5 seconds
  //   this.initializeGame();
  //   this.userSequence = [];
  //   this.level = 1;
  //   this.score = 0;
  //   console.log('Game restarted with new sequence:', this.sequence);
  // }
}

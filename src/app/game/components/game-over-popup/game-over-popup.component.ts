import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ScoreModel } from '../../../core/models';

@Component({
  selector: 'app-game-over-popup',
  standalone: false,
  templateUrl: './game-over-popup.component.html',
  styleUrls: ['./game-over-popup.component.css']
})
export class GameOverPopupComponent {
  @Input() score: number = 0;
  @Input() level: number = 1;
  @Input() isVisible: boolean = false;
  @Output() startAgain = new EventEmitter<void>();

  get gameResult(): ScoreModel {
    return {
      finalScore: this.score,
      maxLevel: this.level,
      timestamp: new Date()
    };
  }
} 
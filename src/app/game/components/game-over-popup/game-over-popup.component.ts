import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-game-over-popup',
  standalone: false,
  template: `
    <div class="game-over-popup" *ngIf="isVisible">
      <div class="popup-content">
        <h2 class="popup-title">GAME OVER</h2>
        <div class="popup-stats">
          <div class="stat-item">
            <div class="stat-label">FINAL SCORE</div>
            <div class="stat-value">{{score}}</div>
          </div>
          <div class="stat-item">
            <div class="stat-label">MAX LEVEL</div>
            <div class="stat-value">{{level}}</div>
          </div>
        </div>
        <button class="cyber-button" (click)="onRestart()">
          TRY AGAIN
        </button>
      </div>
    </div>
  `,
  styleUrls: ['./game-over-popup.component.css']
})
export class GameOverPopupComponent {
  @Input() isVisible: boolean = false;
  @Input() score: number = 0;
  @Input() level: number = 1;
  @Output() restart = new EventEmitter<void>();

  onRestart() {
    this.restart.emit();
  }
} 
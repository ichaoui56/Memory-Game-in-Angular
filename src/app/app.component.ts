import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: false,
  template: `
    <app-home *ngIf="!gameStarted" (startGameEvent)="onStartGame()"></app-home>
    <app-game-board *ngIf="gameStarted"></app-game-board>
  `
})
export class AppComponent {
  gameStarted = false;

  onStartGame() {
    this.gameStarted = true;
  }
}

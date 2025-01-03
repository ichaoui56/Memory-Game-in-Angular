import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-score-state',
  standalone: false,
  templateUrl: './score-state.component.html',
  styleUrls: ['./score-state.component.css']
})
export class ScoreStateComponent {
  @Input() score: number = 0;
  @Input() level: number = 1;
  @Input() highScore: number = 0;
  @Input() isGameOver: boolean = false;
  @Input() countdown: number = 0;

  get currentScore() { return this.score; }
  get matches() { return this.level - 1; }
  get moves() { return this.score; }
}
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  @Output() startGameEvent = new EventEmitter<void>();

  private rules = [
    'Watch the sequence of colors carefully as they light up',
    'Memorize the order of the sequence',
    'Replicate the sequence by clicking the colors in the same order',
    'Complete the sequence before the timer runs out',
    'Each successful round increases difficulty and score'
  ];

  getRuleText(index: number): string {
    return this.rules[index - 1];
  }

  startGame(): void {
    this.startGameEvent.emit();
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  inputName: string = '';
  playerName: string | null = null;

  private rules = [
    'Watch the sequence of colors carefully as they light up',
    'Memorize the order of the sequence',
    'Replicate the sequence by clicking the colors in the same order',
    'Complete the sequence before the timer runs out',
    'Each successful round increases difficulty and score'
  ];

  constructor(private router: Router) {
    this.playerName = localStorage.getItem('playerName');
  }

  getRuleText(index: number): string {
    return this.rules[index - 1];
  }

  saveName(): void {
    if (this.inputName.trim()) {
      this.playerName = this.inputName.trim();
      localStorage.setItem('playerName', this.playerName);
    }
  }

  startGame(): void {
    this.router.navigate(['/game'], { skipLocationChange: false });
  }
}

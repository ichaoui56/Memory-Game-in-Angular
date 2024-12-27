import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  playerName: string | null = null;
  inputName: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    // Check if name exists in localStorage
    this.playerName = localStorage.getItem('playerName');
  }

  saveName() {
    if (this.inputName.trim()) {
      this.playerName = this.inputName;
      localStorage.setItem('playerName', this.inputName);
    }
  }

  startGame() {
    if (this.playerName) {
      this.router.navigate(['/game']);
    }
  }
}

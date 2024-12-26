import { Injectable } from '@angular/core';
import { ScoreModel } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {
  private scores: ScoreModel[] = [];

  addScore(score: ScoreModel): void {
    this.scores.push(score);
  }

  getHighScores(): ScoreModel[] {
    return [...this.scores].sort((a, b) => b.finalScore - a.finalScore);
  }
}

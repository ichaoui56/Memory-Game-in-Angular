import { Injectable } from '@angular/core';
import { ScoreModel } from '../models';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {
  private scores: ScoreModel[] = [];
  private highScore = new BehaviorSubject<number>(0);

  addScore(score: ScoreModel): void {
    this.scores.push(score);
    if (score.finalScore > this.highScore.getValue()) {
      this.highScore.next(score.finalScore);
    }
  }

  getHighScore(): Observable<number> {
    return this.highScore.asObservable();
  }

  getCurrentHighScore(): number {
    return this.highScore.getValue();
  }
}

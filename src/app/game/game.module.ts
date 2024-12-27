import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameBoardComponent } from './components/game-board/game-board.component';
import { ScoreStateComponent } from './components/score-state/score-state.component';
import { InterfaceComponent } from './components/interface/interface.component';
import { GameOverPopupComponent } from './components/game-over-popup/game-over-popup.component';

@NgModule({
  declarations: [
    GameBoardComponent,
    ScoreStateComponent,
    InterfaceComponent,
    GameOverPopupComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    GameBoardComponent
  ]
})
export class GameModule { }

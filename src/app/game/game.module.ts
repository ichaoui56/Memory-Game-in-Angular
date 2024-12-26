import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameBoardComponent } from './components/game-board/game-board.component';
import { InterfaceComponent } from './components/interface/interface.component';
import { ScoreStateComponent } from './components/score-state/score-state.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    GameBoardComponent,
    InterfaceComponent,
    ScoreStateComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule
  ]
})
export class GameModule { }

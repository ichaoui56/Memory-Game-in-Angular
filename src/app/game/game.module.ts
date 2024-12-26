import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameBoardComponent } from './components/game-board/game-board.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
    GameBoardComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule
  ]
})
export class GameModule { }

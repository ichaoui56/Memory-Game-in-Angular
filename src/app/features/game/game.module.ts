import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameRoutingModule } from './game-routing.module';
import { GameBoardComponent } from './components/game-board/game-board.component';
import { SequenceDisplayComponent } from './components/sequence-display/sequence-display.component';


@NgModule({
  declarations: [
    GameBoardComponent,
    SequenceDisplayComponent
  ],
  imports: [
    CommonModule,
    GameRoutingModule
  ]
})
export class GameModule { }

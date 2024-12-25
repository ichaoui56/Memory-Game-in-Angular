import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScoreRoutingModule } from './score-routing.module';
import { ScoreDisplayComponent } from './components/score-display/score-display.component';


@NgModule({
  declarations: [
  ],
  imports: [
    ScoreDisplayComponent,
    CommonModule,
    ScoreRoutingModule
  ]
})
export class ScoreModule { }

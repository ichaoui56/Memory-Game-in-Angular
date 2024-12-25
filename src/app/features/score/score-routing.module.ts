import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ScoreDisplayComponent} from './components/score-display/score-display.component';

const routes: Routes = [
  { path: '', component: ScoreDisplayComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScoreRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'game', pathMatch: 'full' },
  { path: 'game', loadChildren: () => import('./features/game/game.module').then(m => m.GameModule) },
  { path: 'score', loadChildren: () => import('./features/score/score.module').then(m => m.ScoreModule) },
  { path: 'result', loadChildren: () => import('./features/result/result.module').then(m => m.ResultModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

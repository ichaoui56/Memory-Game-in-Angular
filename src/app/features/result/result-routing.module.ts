import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ResultScreenComponent} from './components/result-screen/result-screen.component';

const routes: Routes = [
  { path: '', component: ResultScreenComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResultRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResultRoutingModule } from './result-routing.module';
import { ResultScreenComponent } from './components/result-screen/result-screen.component';


@NgModule({
  declarations: [
    ResultScreenComponent
  ],
  imports: [
    CommonModule,
    ResultRoutingModule
  ]
})
export class ResultModule { }

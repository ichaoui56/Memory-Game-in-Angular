import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResultRoutingModule } from './result-routing.module';
import { ResultScreenComponent } from './components/result-screen/result-screen.component';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    ResultScreenComponent,
    ResultRoutingModule
  ]
})
export class ResultModule { }

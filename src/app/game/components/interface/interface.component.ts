import { Component, Input, Output, EventEmitter } from '@angular/core';
import { sequenceType } from '../../sequenceType';

@Component({
  selector: 'app-interface',
  standalone: false,
  templateUrl: './interface.component.html',
  styleUrls: ['./interface.component.css']
})
export class InterfaceComponent {
  @Input() sequence: sequenceType[] = [];
  @Input() disable: boolean = true;
  @Input() activeCardIndex: number | null = null;
  @Input() userSequence: sequenceType[] = [];
  @Output() cardClick = new EventEmitter<sequenceType>();
  @Output() validateClick = new EventEmitter<void>();
  @Output() resetClick = new EventEmitter<void>();

  isClicked: number | null = null;

  onCardClick(seq: sequenceType): void {
    if (!this.disable) {
      this.isClicked = seq.order;
      setTimeout(() => this.isClicked = null, 200);
      this.cardClick.emit(seq);
    }
  }
} 
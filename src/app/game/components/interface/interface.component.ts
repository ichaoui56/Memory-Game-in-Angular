import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SequenceModel } from '../../../core/models';

@Component({
  selector: 'app-interface',
  standalone: false,
  templateUrl: './interface.component.html',
  styleUrls: ['./interface.component.css']
})
export class InterfaceComponent {
  @Input() sequence: SequenceModel[] = [];
  @Input() disable: boolean = false;
  @Input() activeCardIndex: number | null = null;
  @Input() userSequence: SequenceModel[] = [];
  @Input() isGameOver: boolean = false;

  @Output() cardClick = new EventEmitter<SequenceModel>();
  @Output() validateClick = new EventEmitter<void>();
  @Output() resetClick = new EventEmitter<void>();
  @Output() startAgainClick = new EventEmitter<void>();

  isClicked: number | null = null;

  onCardClick(seq: SequenceModel): void {
    if (!this.disable && this.userSequence.length < this.sequence.length * 2) {
      this.isClicked = seq.order;
      setTimeout(() => this.isClicked = null, 200);
      this.cardClick.emit(seq);
    }
  }

  getEmptySlots(): number[] {
    if (this.userSequence.length <= this.sequence.length) {
      const remainingSlots = this.sequence.length - this.userSequence.length;
      return Array(remainingSlots).fill(0);
    }
    return [];
  }
} 
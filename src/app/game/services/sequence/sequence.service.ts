import { Injectable } from '@angular/core';
import { sequenceType } from '../../sequenceType';

@Injectable({
  providedIn: 'root',
})
export class SequenceService {
  private sequence: sequenceType[] = [];
  private hexCharacters: string[] = [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
  ];
  private currentLength: number = 2; // Initial length

  constructor() {}

  getSequence(): sequenceType[] {
    return [...this.sequence];
  }

  ajouterCouleur(): void {
    this.sequence.push({
      color: this.generateNewColor(),
      order: this.sequence.length + 1,
    });
  }

  verifierReponse(userSequence: sequenceType[]): boolean {
    if (userSequence.length !== this.sequence.length) {
      return false;
    }
    return userSequence.every((color, index) => color === this.sequence[index]);
  }

  resetGame(): void {
    this.sequence = [];
  }

  resetSequence(): void {
    this.sequence = [];
    this.currentLength = 2; // Reset to initial length
    this.generateInitialSequence();
  }

  private generateInitialSequence(): void {
    for (let i = 0; i < this.currentLength; i++) {
      this.ajouterCouleur();
    }
  }

  private getCharacter(index: number): string {
    return this.hexCharacters[index];
  }

  private generateNewColor(): string {
    let hexColorRep = '#';
    for (let index = 0; index < 6; index++) {
      const randomPosition = Math.floor(
        Math.random() * this.hexCharacters.length
      );
      hexColorRep += this.getCharacter(randomPosition);
    }
    return hexColorRep;
  }
}

import { Component, input, output } from '@angular/core';
import { Word } from '../../models/word';
import { TagComponent, CardComponent } from '@shared/components';

@Component({
  selector: 'app-word-card',
  imports: [TagComponent, CardComponent],
  templateUrl: './word-card.component.html',
  styleUrl: './word-card.component.css',
})
export class WordCardComponent {
  word = input.required<Word>();
  wordDelete = output<string>();

  deleteWord(id: string) {
    this.wordDelete.emit(id);
  }
}

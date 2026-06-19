import { Component, input, output, signal } from '@angular/core';
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
  wordUpdate = output<{ id: string; word: Partial<Word> }>();

  protected readonly isRevealed = signal(false);

  toggleReveal() {
    this.isRevealed.update((v) => !v);
  }

  toggleLearned(event: Event) {
    event.stopPropagation();
    const newStatus = this.word().status === 'learned' ? 'learning' : 'learned';
    this.wordUpdate.emit({ id: this.word()._id, word: { status: newStatus } });
  }

  deleteWord(event: Event) {
    event.stopPropagation();
    this.wordDelete.emit(this.word()._id);
  }

  speakWord(event: Event) {
    event.stopPropagation();
    const utterance = new SpeechSynthesisUtterance(this.word().word);
    console.log(utterance);
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
  }
}

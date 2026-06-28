import { Component, input, output, signal } from '@angular/core';
import { CardComponent, TagComponent } from '@shared/components';
import { Word } from '../../models/word';

@Component({
  selector: 'app-word-card',
  imports: [TagComponent, CardComponent],
  templateUrl: './word-card.component.html',
  styleUrl: './word-card.component.css',
})
export class WordCardComponent {
  protected readonly isRevealed = signal(false);
  word = input.required<Word>();
  wordDelete = output<string>();
  wordEdit = output<Word>();

  wordUpdate = output<{ id: string; word: Partial<Word> }>();

  deleteWord(event: Event) {
    event.stopPropagation();
    this.wordDelete.emit(this.word().id);
  }

  editWord(event: Event) {
    event.stopPropagation();
    this.wordEdit.emit(this.word());
  }

  speakWord(event: Event) {
    event.stopPropagation();
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(this.word().word);
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
  }

  toggleLearned(event: Event) {
    event.stopPropagation();
    const newStatus = this.word().status === 'learned' ? 'learning' : 'learned';
    this.wordUpdate.emit({ id: this.word().id, word: { status: newStatus } });
  }

  toggleReveal() {
    this.isRevealed.update((v) => !v);
  }
}

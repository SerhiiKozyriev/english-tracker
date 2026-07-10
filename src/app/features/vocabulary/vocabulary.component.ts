import { Component, computed, DestroyRef, inject, signal, viewChild } from '@angular/core';
import { SearchComponent } from '@shared/components';

import { rxResource, takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AddWordModalComponent } from './components/add-word-modal/add-word-modal.component';
import { WordCardComponent } from './components/word-card/word-card.component';
import { WordFilterComponent } from './components/word-filter/word-filter.component';
import { Word, WordFormModel } from './models/word';
import { VocabularyService } from './services/vocabulary.service';

@Component({
  selector: 'app-vocabulary',
  imports: [SearchComponent, WordCardComponent, AddWordModalComponent, WordFilterComponent],
  providers: [VocabularyService],

  templateUrl: './vocabulary.component.html',
  styleUrl: './vocabulary.component.css',
})
export class VocabularyComponent {
  private readonly destroyRef = inject(DestroyRef);
  private readonly vocabularyService = inject(VocabularyService);
  private readonly addWordModalComponent = viewChild.required(AddWordModalComponent);
  protected readonly filterQuery = signal<string>('all');

  protected readonly searchQuery = signal<string>('');
  protected readonly selectedWord = signal<Word | null>(null);
  protected readonly title = computed(() => (this.selectedWord() ? 'Edit word' : 'New word'));
  protected readonly wordsResource = rxResource({
    params: () => ({ search: this.searchQuery(), status: this.filterQuery() }),
    stream: ({ params }) => this.vocabularyService.getWords(params.search, params.status),
  });

  protected readonly wordsStatsResource = rxResource({
    stream: () => this.vocabularyService.getStats(),
  });

  deleteWord(id: string): void {
    this.vocabularyService
      .deleteWord(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.wordsResource.reload();
        this.wordsStatsResource.reload();
      });
  }

  editWord(word: Word): void {
    this.selectedWord.set(word);
    this.addWordModalComponent().open();
  }

  onWordSaved(data: WordFormModel): void {
    const word = this.selectedWord();

    const request$ = word ? this.vocabularyService.updateWord(word.id, data) : this.vocabularyService.createWord(data);

    request$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.wordsResource.reload();
      this.wordsStatsResource.reload();
      this.selectedWord.set(null);
    });
  }

  openAddWordModal(): void {
    this.selectedWord.set(null);
    this.addWordModalComponent().open();
  }

  updateWord(id: string, word: Partial<Word>): void {
    this.vocabularyService
      .updateWord(id, word)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.wordsResource.reload();
        this.wordsStatsResource.reload();
      });
  }
}

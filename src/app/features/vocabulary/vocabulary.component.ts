import { Component, DestroyRef, inject, signal, viewChild } from '@angular/core';
import { SearchComponent } from '@shared/components';

import { VocabularyService } from './services/vocabulary.service';
import { rxResource, takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { WordCardComponent } from './components/word-card/word-card.component';
import { AddWordModalComponent } from './components/add-word-modal/add-word-modal.component';
import { WordFilterComponent } from './components/word-filter/word-filter.component';
import { Word } from './models/word';

@Component({
  selector: 'app-vocabulary',
  imports: [SearchComponent, WordCardComponent, AddWordModalComponent, WordFilterComponent],
  providers: [VocabularyService],

  templateUrl: './vocabulary.component.html',
  styleUrl: './vocabulary.component.css',
})
export class VocabularyComponent {
  protected readonly searchQuery = signal<string>('');
  protected readonly filterQuery = signal<string>('all');
  private readonly vocabularyService = inject(VocabularyService);

  protected readonly wordsResource = rxResource({
    params: () => ({ search: this.searchQuery(), status: this.filterQuery() }),
    stream: ({ params }) => this.vocabularyService.getWords(params.search, params.status),
  });
  protected readonly wordsStatsResource = rxResource({
    stream: () => this.vocabularyService.getStats(),
  });
  private readonly addWordModalComponent = viewChild(AddWordModalComponent);
  private readonly destroyRef = inject(DestroyRef);

  openAddWordModal(): void {
    this.addWordModalComponent()?.open();
  }

  onWordAdded(): void {
    this.wordsResource.reload();
  }

  updateWord(id: string, word: Partial<Word>): void {
    this.vocabularyService
      .updateWord(id, word)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.wordsResource.reload());
  }

  deleteWord(id: string): void {
    this.vocabularyService
      .deleteWord(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.wordsResource.reload());
  }
}


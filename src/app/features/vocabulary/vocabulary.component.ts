import { Component, inject, signal, viewChild } from '@angular/core';
import { SearchComponent } from '@shared/components';

import { VocabularyService } from './services/vocabulary.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { WordCardComponent } from './components/word-card/word-card.component';
import { AddWordModalComponent } from './components/add-word-modal/add-word-modal.component';
import { Word } from './models/word';

@Component({
  selector: 'app-vocabulary',
  imports: [SearchComponent, WordCardComponent, AddWordModalComponent],
  providers: [VocabularyService],

  templateUrl: './vocabulary.component.html',
  styleUrl: './vocabulary.component.css',
})
export class VocabularyComponent {
  protected readonly searchQuery = signal<string>('');
  private readonly vocabularyService = inject(VocabularyService);

  protected readonly wordsResource = rxResource({
    params: () => this.searchQuery(),
    stream: ({ params }) => this.vocabularyService.getWords(params),
  });

  private readonly addWordModalComponent = viewChild(AddWordModalComponent);

  openAddWordModal(): void {
    this.addWordModalComponent()?.open();
  }

  onWordAdded(): void {
    this.wordsResource.reload();
  }

  updateWord(id: string, word: Partial<Word>): void {
    this.vocabularyService.updateWord(id, word).subscribe(() => this.wordsResource.reload());
  }

  deleteWord(id: string): void {
    this.vocabularyService.deleteWord(id).subscribe(() => this.wordsResource.reload());
  }
}


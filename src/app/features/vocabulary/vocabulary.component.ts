import { Component, inject, signal } from '@angular/core';
import { SearchComponent } from '@shared/components';

import { VocabularyService } from './services/vocabulary.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { WordCardComponent } from './components/word-card/word-card.component';

@Component({
  selector: 'app-vocabulary',
  imports: [SearchComponent, WordCardComponent],
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

  deleteWord(id: string): void {
    this.vocabularyService.deleteWord(id).subscribe(() => this.wordsResource.reload());
  }
}


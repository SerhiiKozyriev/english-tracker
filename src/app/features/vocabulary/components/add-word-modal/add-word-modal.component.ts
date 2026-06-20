import { Component, DestroyRef, inject, output, signal, viewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { form, FormField, required } from '@angular/forms/signals';
import { ModalComponent } from '@shared/components/modal/modal.component';
import { WordStatus } from '../../models/word';
import { VocabularyService } from '../../services/vocabulary.service';

interface CreateWordData {
  word: string;
  translation: string;
  example: string;
  status: WordStatus;
}

@Component({
  selector: 'app-add-word-modal',
  imports: [ModalComponent, FormField],
  templateUrl: './add-word-modal.component.html',
  styleUrl: './add-word-modal.component.css',
})
export class AddWordModalComponent {
  private readonly initialFormData: CreateWordData = {
    word: '',
    translation: '',
    example: '',
    status: 'learning',
  };

  protected readonly createWordModel = signal<CreateWordData>(this.initialFormData);

  protected readonly createWordForm = form(this.createWordModel, (fields) => {
    required(fields.word);
    required(fields.translation);
  });

  private readonly destroyRef = inject(DestroyRef);

  private readonly modalComponent = viewChild.required(ModalComponent);
  private readonly vocabularyService: VocabularyService = inject(VocabularyService);
  wordAdded = output<void>();

  close(): void {
    this.resetForm();
    this.modalComponent().close();
  }

  protected createWord(): void {
    this.vocabularyService
      .createWord(this.createWordModel())
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.wordAdded.emit();
        this.resetForm();
        this.close();
      });
  }

  open(): void {
    this.modalComponent().open();
  }

  resetForm(): void {
    this.createWordForm().reset();
    this.createWordModel.set(this.initialFormData);
  }
}

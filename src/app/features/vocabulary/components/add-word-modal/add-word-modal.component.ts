import { Component, inject, output, signal, viewChild } from '@angular/core';
import { form, FormField, required } from '@angular/forms/signals';
import { ModalComponent } from '@shared/components/modal/modal.component';
import { VocabularyService } from '../../services/vocabulary.service';
import { WordStatus } from '../../models/word';

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
  wordAdded = output<void>();

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

  private readonly modalComponent = viewChild(ModalComponent);
  private readonly vocabularyService: VocabularyService = inject(VocabularyService);

  resetForm(): void {
    this.createWordForm().reset();
    this.createWordModel.set(this.initialFormData);
  }

  close(): void {
    this.resetForm();
    this.modalComponent()?.close();
  }

  open(): void {
    this.modalComponent()?.open();
  }

  protected createWord(): void {
    this.vocabularyService.createWord(this.createWordModel()).subscribe(() => {
      this.wordAdded.emit();
      this.resetForm();
      this.close();
    });
  }
}

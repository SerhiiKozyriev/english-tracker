import { Component, input, linkedSignal, output, viewChild } from '@angular/core';
import { form, FormField, required } from '@angular/forms/signals';
import { ModalComponent } from '@shared/components/modal/modal.component';
import { Word, WordFormModel } from '../../models/word';

@Component({
  selector: 'app-add-word-modal',
  imports: [ModalComponent, FormField],
  templateUrl: './add-word-modal.component.html',
  styleUrl: './add-word-modal.component.css',
})
export class AddWordModalComponent {
  private readonly initialFormData: WordFormModel = {
    word: '',
    translation: '',
    example: '',
    status: 'learning',
  };

  word = input<Word | null>(null);
  protected readonly model = linkedSignal<WordFormModel>(() => this.word() ?? this.initialFormData);

  protected readonly form = form(this.model, (fields) => {
    required(fields.word);
    required(fields.translation);
  });

  private readonly modalComponent = viewChild.required(ModalComponent);

  title = input.required<string>();
  wordSaved = output<WordFormModel>();

  close(): void {
    this.resetForm();
    this.modalComponent().close();
  }

  open(): void {
    this.modalComponent().open();
  }

  resetForm(): void {
    this.form().reset();
    this.model.set(this.initialFormData);
  }

  protected saveWord(): void {
    if (this.form().invalid()) return;
    this.wordSaved.emit(this.model());
    this.close();
  }
}

import { Component, input, linkedSignal, output, viewChild } from '@angular/core';
import { applyEach, form, FormField, min, required } from '@angular/forms/signals';
import { ModalComponent } from '@shared/components/modal/modal.component';
import { categoryToTagMap, TopicCategory } from '../../models/category';
import { Session, SessionFormModel } from '../../models/sessions';
import { CategoryTagComponent } from '../category-tag/category-tag.component';

@Component({
  selector: 'app-session-modal',
  imports: [ModalComponent, FormField, CategoryTagComponent],
  templateUrl: './session-modal.component.html',
  styleUrl: './session-modal.component.css',
})
export class SessionModalComponent {
  protected readonly categoriesList = Object.entries(categoryToTagMap).map(([key, value]) => ({
    key: key as TopicCategory,
    label: value.label,
    variant: value.variant,
  }));

  private readonly initialFormData: SessionFormModel = {
    date: new Date().toISOString().split('T')[0],
    notes: '',
    duration: 0,
    topics: [{ category: 'grammar', desc: '' }],
  };

  session = input<Session | null>(null);
  protected readonly model = linkedSignal<SessionFormModel>(() => this.session() ?? this.initialFormData);

  protected readonly form = form(this.model, (fields) => {
    required(fields.date);
    required(fields.duration);
    min(fields.duration, 10);
    applyEach(fields.topics, (topic) => {
      required(topic.desc);
    });
  });

  private readonly modalComponent = viewChild.required(ModalComponent);

  sessionSaved = output<SessionFormModel>();
  title = input.required<string>();

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

  protected saveSession(): void {
    if (this.form().invalid()) return;
    this.sessionSaved.emit(this.model());
    this.close();
  }

  selectCategory(key: TopicCategory) {
    this.model.update((prev) => ({
      ...prev,
      topics: [
        ...prev.topics,
        {
          category: key,
          desc: '',
        },
      ],
    }));
  }
}

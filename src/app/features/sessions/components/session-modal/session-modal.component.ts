import { Component, computed, input, linkedSignal, output, viewChild } from '@angular/core';
import { form, FormField, min, required, validate } from '@angular/forms/signals';
import { CATEGORIES_CONFIG, Category } from '@app/shared/category';
import { ModalComponent, TagComponent } from '@shared/components';
import { Session, SessionFormModel } from '../../models/sessions';

@Component({
  selector: 'app-session-modal',
  imports: [ModalComponent, FormField, TagComponent],
  templateUrl: './session-modal.component.html',
  styleUrl: './session-modal.component.css',
})
export class SessionModalComponent {
  categories = input.required<Category[]>();
  session = input<Session | null>(null);
  title = input.required<string>();
  modalClosed = output<void>();
  sessionSaved = output<SessionFormModel>();
  private readonly modalComponent = viewChild.required(ModalComponent);
  protected readonly categoriesConfig = CATEGORIES_CONFIG;
  private readonly initialFormData: SessionFormModel = {
    date: new Date().toISOString().split('T')[0],
    notes: '',
    duration: 0,
    topics: [],
  };
  protected readonly model = linkedSignal<SessionFormModel>(() => this.session() || this.initialFormData);
  protected readonly form = form(this.model, (fields) => {
    required(fields.date);
    required(fields.duration);
    min(fields.duration, 10);
    validate(fields.topics, (context) => {
      return context.value().length > 0 ? null : { kind: 'required' };
    });
  });
  protected readonly selectedCategory = linkedSignal({
    source: () => this.categories(),
    computation: (categories): Category => categories[0],
  });
  protected readonly selectedCategoryTopic = computed(() =>
    this.model().topics.find((topic) => topic.category.id === this.selectedCategory()?.id),
  );

  close(): void {
    this.modalComponent().close();
  }

  open(): void {
    this.modalComponent().open();
  }

  removeTopic(descToRemove: string): void {
    const currentCategory = this.selectedCategory();
    if (!currentCategory) {
      return;
    }

    this.model.update((prev) => {
      const topics = prev.topics
        .map((topic) => {
          if (topic.category.id !== currentCategory.id) {
            return topic;
          }
          const desc = topic.desc.filter((d) => d !== descToRemove);
          return { ...topic, desc };
        })
        .filter((topic) => topic.desc.length > 0);

      return { ...prev, topics };
    });
  }

  protected addTopic(value: string): void {
    const desc = value.trim();
    const currentCategory = this.selectedCategory();

    if (!desc || !currentCategory) {
      return;
    }

    this.model.update((prev) => {
      const updatedTopics = [...prev.topics];
      const index = updatedTopics.findIndex((t) => t.category.id === currentCategory.id);

      if (index !== -1) {
        const existing = updatedTopics[index];
        updatedTopics[index] = {
          ...existing,
          desc: [...existing.desc, desc],
        };
      } else {
        updatedTopics.push({
          category: currentCategory,
          desc: [desc],
        });
      }

      return { ...prev, topics: updatedTopics };
    });
  }

  protected onAddTopicInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.addTopic(target.value);
    target.value = '';
  }

  protected onModalClose(): void {
    this.resetForm();
    this.modalClosed.emit();
  }

  protected saveSession(): void {
    if (this.form().invalid()) return;
    this.sessionSaved.emit(this.model());
    this.close();
  }

  protected selectCategory(category: Category) {
    this.selectedCategory.set(category);
  }

  private resetForm(): void {
    this.form().reset();
    this.model.set(this.initialFormData);
  }
}

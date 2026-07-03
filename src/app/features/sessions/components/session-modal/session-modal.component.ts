import { Component, computed, inject, input, linkedSignal, output, viewChild } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { applyEach, form, FormField, min, required } from '@angular/forms/signals';
import { CATEGORIES_CONFIG, Category, CategoryService } from '@app/shared/category';
import { ModalComponent, TagComponent } from '@shared/components';
import { Session, SessionFormModel } from '../../models/sessions';

@Component({
  selector: 'app-session-modal',
  imports: [ModalComponent, FormField, TagComponent],
  templateUrl: './session-modal.component.html',
  styleUrl: './session-modal.component.css',
  providers: [CategoryService],
})
export class SessionModalComponent {
  protected readonly categoriesConfig = CATEGORIES_CONFIG;
  private readonly categoryService = inject(CategoryService);
  protected readonly categoriesResource = rxResource({
    stream: () => this.categoryService.getCategories(),
  });
  private readonly initialFormData: SessionFormModel = {
    date: new Date().toISOString().split('T')[0],
    notes: '',
    duration: 0,
    topics: [],
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
  modalClosed = output<void>();
  private readonly modalComponent = viewChild.required(ModalComponent);
  protected readonly selectedCategory = linkedSignal({
    source: () => this.categoriesResource.value(),
    computation: (categories): Category | null => categories?.[0] ?? null,
  });
  sessionSaved = output<SessionFormModel>();
  title = input.required<string>();
  protected readonly topicsBySelectedCategory = computed(() =>
    this.model().topics.find((topic) => topic.category.id === this.selectedCategory()?.id),
  );

  protected addTopic(event: Event) {
    const target = event.target as HTMLInputElement;
    const currentCategory = this.selectedCategory();

    if (!currentCategory) {
      return;
    }
    this.model.update((prev) => {
      const updatedTopics = [...prev.topics];
      const existingTopic = updatedTopics.find((t) => t.category.id === currentCategory.id);
      if (existingTopic) {
        existingTopic.desc = existingTopic.desc + ',' + target.value;
        return { ...prev, topics: updatedTopics };
      }
      return {
        ...prev,
        topics: [...prev.topics, { categoryId: currentCategory.id, category: currentCategory, desc: target.value }],
      };
    });
  }

  close(): void {
    this.modalComponent().close();
  }

  protected onModalClose(): void {
    this.resetForm();
    this.modalClosed.emit();
  }

  open(): void {
    this.modalComponent().open();
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

import {
  Component,
  inject,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { SessionTopic } from '../../models/sessions';
import { applyEach, form, FormField, min, required } from '@angular/forms/signals';
import { CategoryTagComponent } from '../category-tag/category-tag.component';
import { categoryToTagMap, TopicCategory } from '../../models/category';
import { SessionsService } from '../../services/sessions.service';
import { ModalComponent } from '@shared/components/modal/modal.component';

interface CreateSessionDate {
  date: string;
  notes: string;
  duration: number;
  topics: SessionTopic[];
}

@Component({
  selector: 'app-create-session-modal',
  imports: [ModalComponent, FormField, CategoryTagComponent],
  templateUrl: './create-session-modal.component.html',
  styleUrl: './create-session-modal.component.css',
})
export class CreateSessionModalComponent {
  sessionCreated = output<void>();
  protected readonly categoriesList = Object.entries(categoryToTagMap).map(([key, value]) => ({
    key: key as TopicCategory,
    label: value.label,
    variant: value.variant,
  }));
  private readonly initialFormData: CreateSessionDate = {
    date: '',
    notes: '',
    duration: 0,
    topics: [
      {
        category: 'grammar',
        desc: '',
      },
    ],
  };
  protected readonly createSessionModel = signal<CreateSessionDate>(this.initialFormData);
  protected readonly createSessionForm = form(this.createSessionModel, (fields) => {
    required(fields.date);
    required(fields.duration);
    min(fields.duration, 10);
    applyEach(fields.topics, (topic) => {
      required(topic.desc);
    });
  });
  private readonly modalComponent = viewChild(ModalComponent);
  private readonly sessionsService: SessionsService = inject(SessionsService);
  resetForm(): void {
    this.createSessionForm().reset();
    this.createSessionModel.set(this.initialFormData);
  }
  close(): void {
    this.resetForm();
    this.modalComponent()?.close();
  }

  open(): void {
    this.modalComponent()?.open();
  }

  selectCategory(key: TopicCategory) {
    this.createSessionModel.update((prev) => ({
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

  protected createSession(): void {
    this.sessionsService.createSession(this.createSessionModel()).subscribe((newSession) => {
      this.sessionCreated.emit();
      this.resetForm();
      this.close();
    });
  }
}

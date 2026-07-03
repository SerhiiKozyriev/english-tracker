import { Component, computed, input, output } from '@angular/core';
import { CATEGORIES_CONFIG } from '@app/shared/category';
import { TagComponent } from '@shared/components';
import { Session } from '../../models/sessions';

@Component({
  selector: 'app-session-card',
  imports: [TagComponent],
  templateUrl: './session-card.component.html',
  styleUrl: './session-card.component.css',
})
export class SessionCardComponent {
  protected readonly categoriesConfig = CATEGORIES_CONFIG;
  session = input.required<Session>();
  sessionDelete = output<string>();
  sessionEdit = output<Session>();

  totalItems = computed(() => {
    return this.session().topics.reduce((acc) => acc + 1, 0);
  });

  deleteSession(id: string) {
    this.sessionDelete.emit(id);
  }

  editSession(session: Session) {
    this.sessionEdit.emit(session);
  }
}

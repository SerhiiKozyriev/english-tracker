import { Component, computed, input, output } from '@angular/core';
import { CategoryTagComponent } from '@app/shared/category';
import { Session } from '../../models/sessions';

@Component({
  selector: 'app-session-card',
  imports: [CategoryTagComponent],
  templateUrl: './session-card.component.html',
  styleUrl: './session-card.component.css',
})
export class SessionCardComponent {
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

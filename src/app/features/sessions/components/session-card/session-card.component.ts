import { Component, computed, input, output } from '@angular/core';
import { Session } from '../../models/sessions';
import { CategoryTagComponent } from '../category-tag/category-tag.component';

@Component({
  selector: 'app-session-card',
  imports: [CategoryTagComponent],
  templateUrl: './session-card.component.html',
  styleUrl: './session-card.component.css',
})
export class SessionCardComponent {
  sessionDelete = output<string>();
  session = input.required<Session>();

  totalItems = computed(() => {
    return this.session().topics.reduce((acc, t) => acc + t.desc.length, 0);
  });

  onDelete(id: string) {
    this.sessionDelete.emit(id);
  }
}

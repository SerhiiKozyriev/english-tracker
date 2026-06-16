import { Component, computed, input } from '@angular/core';
import { Session } from '../../models/sessions';

@Component({
  selector: 'app-stats-card',
  standalone: true,
  templateUrl: './total-stats-card.component.html',
  styleUrls: ['./total-stats-card.component.css'],
})
export class TotalStatsCardComponent {
  sessions = input.required<Session[] | undefined>();

  sessionsCount = computed(() => this.sessions()?.length);

  stats = computed(() => {
    const sessions = this.sessions() || [];

    let totalMinutes = 0;
    let totalTopics = 0;

    for (const session of sessions) {
      totalMinutes += session.duration || 0;

      if (session.topics) {
        for (let i = 0; i <= session.topics.length; i++) {
          totalTopics += 1;
        }
      }
    }

    return {
      sessionsCount: sessions.length,
      hours: Math.floor(totalMinutes / 60),
      minutes: totalMinutes % 60,
      topicsCount: totalTopics,
    };
  });
}

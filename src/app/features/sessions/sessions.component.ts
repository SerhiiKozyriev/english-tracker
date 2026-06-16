import { Component, computed, inject, signal, viewChild } from '@angular/core';
import { SessionsService } from './services/sessions.service';
import { SearchComponent } from '@shared/components';
import { rxResource } from '@angular/core/rxjs-interop';

import { SessionCardComponent } from './components/session-card/session-card.component';
import { StreakCardComponent } from './components/streak-card/streak-card.component';
import { CategoryStatsComponent } from './components/category-stats/category-stats.component';
import { TotalStatsCardComponent } from './components/total-stats-card/total-stats-card.component';
import { CreateSessionModalComponent } from './components/create-session-modal/create-session-modal.component';

@Component({
  selector: 'app-sessions',
  imports: [
    SearchComponent,
    SessionCardComponent,
    StreakCardComponent,
    TotalStatsCardComponent,
    CategoryStatsComponent,
    CreateSessionModalComponent,
  ],
  providers: [SessionsService],
  templateUrl: './sessions.component.html',
  styleUrl: './sessions.component.css',
})
export class SessionsComponent {
  protected readonly searchQuery = signal<string>('');
  protected readonly streak = computed(() => {
    const toDayNumber = (date: Date | string): number => {
      const d = new Date(date);
      d.setHours(0, 0, 0, 0);
      return Math.floor(d.getTime() / 86_400_000);
    };

    const dates = this.sessionsResource.value()?.map((s) => toDayNumber(s.date));

    if (!dates?.length) return 0;

    const today = toDayNumber(new Date());

    if (dates[0] < today - 1) return 0;

    let streak = 1;

    for (let i = 1; i < dates.length; i++) {
      if (dates[i - 1] - dates[i] === 1) {
        streak++;
      } else {
        break;
      }
    }

    return streak;
  });
  private readonly sessionsService: SessionsService = inject(SessionsService);
  protected readonly sessionsResource = rxResource({
    params: () => this.searchQuery(),
    stream: ({ params }) => this.sessionsService.getSessions(params),
  });
  private readonly addSessionModalComponent = viewChild(CreateSessionModalComponent);

  openCreateSessionModal(): void {
    this.addSessionModalComponent()?.open();
  }

  onSessionCreated(): void {
    this.sessionsResource.reload();
  }

  deleteSession(id: string): void {
    this.sessionsService.deleteSession(id).subscribe(() => this.sessionsResource.reload());
  }
}

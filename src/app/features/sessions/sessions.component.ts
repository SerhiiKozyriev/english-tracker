import { Component, computed, DestroyRef, inject, signal, viewChild } from '@angular/core';
import { rxResource, takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SearchComponent } from '@shared/components';
import { CategoryStatsComponent } from './components/category-stats/category-stats.component';
import { SessionCardComponent } from './components/session-card/session-card.component';
import { SessionModalComponent } from './components/session-modal/session-modal.component';
import { StreakCardComponent } from './components/streak-card/streak-card.component';
import { TotalStatsCardComponent } from './components/total-stats-card/total-stats-card.component';
import { Session, SessionFormModel } from './models/sessions';
import { SessionsService } from './services/sessions.service';

@Component({
  selector: 'app-sessions',
  imports: [
    SearchComponent,
    SessionCardComponent,
    StreakCardComponent,
    TotalStatsCardComponent,
    CategoryStatsComponent,
    SessionModalComponent,
  ],
  providers: [SessionsService],
  templateUrl: './sessions.component.html',
  styleUrl: './sessions.component.css',
})
export class SessionsComponent {
  private readonly destroyRef = inject(DestroyRef);
  protected readonly searchQuery = signal<string>('');
  protected readonly selectedSession = signal<Session | null>(null);
  private readonly sessionModalComponent = viewChild.required(SessionModalComponent);
  private readonly sessionsService: SessionsService = inject(SessionsService);
  protected readonly sessionsResource = rxResource({
    params: () => this.searchQuery(),
    stream: ({ params }) => this.sessionsService.getSessions(params),
  });
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
  protected readonly title = computed(() => (this.selectedSession() ? 'Edit session' : 'Create session'));

  createSession(): void {
    this.selectedSession.set(null);
    this.sessionModalComponent().open();
  }

  deleteSession(id: string): void {
    this.sessionsService
      .deleteSession(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.sessionsResource.reload());
  }

  editSession(session: Session): void {
    this.selectedSession.set(session);
    this.sessionModalComponent().open();
  }

  onSessionSaved(data: SessionFormModel): void {
    const session = this.selectedSession();

    const request$ = session
      ? this.sessionsService.updateSession(session._id, data)
      : this.sessionsService.createSession(data);

    request$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.sessionsResource.reload();
      this.selectedSession.set(null);
    });
  }
}

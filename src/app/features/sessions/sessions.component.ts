import { Component, computed, DestroyRef, inject, signal, viewChild } from '@angular/core';
import { rxResource, takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SearchComponent } from '@shared/components';
import { CategoryService } from '../../shared/category';
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
  providers: [SessionsService, CategoryService],
  templateUrl: './sessions.component.html',
  styleUrl: './sessions.component.css',
})
export class SessionsComponent {
  private readonly categoryService = inject(CategoryService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly sessionsService: SessionsService = inject(SessionsService);
  private readonly sessionModalComponent = viewChild.required(SessionModalComponent);
  protected readonly categoriesResource = rxResource({
    stream: () => this.categoryService.getCategories(),
  });
  protected readonly searchQuery = signal<string>('');
  protected readonly selectedSession = signal<Session | null>(null);
  protected readonly sessionsResource = rxResource({
    params: () => this.searchQuery(),
    stream: ({ params }) => this.sessionsService.getSessions(params),
  });
  protected readonly statsResource = rxResource({
    stream: () => this.sessionsService.getStats(),
  });

  protected readonly title = computed(() => (this.selectedSession() ? 'Edit session' : 'New session'));

  createSession(): void {
    this.selectedSession.set(null);
    this.sessionModalComponent().open();
  }

  deleteSession(id: string): void {
    this.sessionsService
      .deleteSession(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.sessionsResource.reload();
        this.statsResource.reload();
      });
  }

  editSession(session: Session): void {
    this.selectedSession.set(session);
    this.sessionModalComponent().open();
  }

  onModalClosed(): void {
    this.selectedSession.set(null);
  }

  onSessionSaved(data: SessionFormModel): void {
    const session = this.selectedSession();

    const request$ = session
      ? this.sessionsService.updateSession(session.id, data)
      : this.sessionsService.createSession(data);

    request$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.sessionsResource.reload();
      this.statsResource.reload();
      this.selectedSession.set(null);
    });
  }
}

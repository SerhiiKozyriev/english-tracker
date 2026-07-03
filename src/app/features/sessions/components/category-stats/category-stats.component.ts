import { Component, computed, input } from '@angular/core';
import { CATEGORIES_CONFIG, Category } from '@app/shared/category';
import { TagComponent } from '@shared/components';
import { Session } from '../../models/sessions';

@Component({
  selector: 'app-category-stats',
  imports: [TagComponent],
  templateUrl: './category-stats.component.html',
  styleUrl: './category-stats.component.css',
})
export class CategoryStatsComponent {
  protected readonly categoriesConfig = CATEGORIES_CONFIG;
  sessions = input.required<Session[]>();

  categoriesData = computed(() => {
    if (!this.sessions()?.length) return [];
    const statsMap = new Map<string, { category: Category; count: number }>();

    for (const session of this.sessions()) {
      for (const topic of session.topics) {
        const { id } = topic.category;
        const currentCount = statsMap.get(id)?.count ?? 0;

        statsMap.set(id, {
          category: topic.category,
          count: currentCount + 1,
        });
      }
    }
    return Array.from(statsMap.values()).sort((a, b) => b.count - a.count);
  });
}

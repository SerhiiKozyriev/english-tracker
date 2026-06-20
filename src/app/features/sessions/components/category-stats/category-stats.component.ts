import { Component, computed, input } from '@angular/core';
import { TopicCategory } from '../../models/category';
import { Session } from '../../models/sessions';
import { CategoryTagComponent } from '../category-tag/category-tag.component';

@Component({
  selector: 'app-category-stats',
  imports: [CategoryTagComponent],
  templateUrl: './category-stats.component.html',
  styleUrl: './category-stats.component.css',
})
export class CategoryStatsComponent {
  sessions = input.required<Session[] | undefined>();

  categoriesData = computed(() => {
    if (!this.sessions()?.length) return [];

    const statsMap = new Map<TopicCategory, number>();

    for (const session of this.sessions() || []) {
      if (!session.topics) continue;

      for (const topic of session.topics) {
        statsMap.set(topic.category, (statsMap.get(topic.category) || 0) + 1);
      }
    }
    return Array.from(statsMap, ([category, count]) => ({ category, count })).sort((a, b) => b.count - a.count);
  });
}

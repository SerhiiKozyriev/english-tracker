import { Component, computed, input } from '@angular/core';
import { CATEGORIES_CONFIG } from '@app/shared/category';
import { TagComponent } from '@shared/components';

@Component({
  selector: 'app-category-stats',
  imports: [TagComponent],
  templateUrl: './category-stats.component.html',
  styleUrl: './category-stats.component.css',
})
export class CategoryStatsComponent {
  statsByCategory = input.required<Record<string, number>>();
  protected readonly categoriesConfig = CATEGORIES_CONFIG;
  categoriesData = computed(() => {
    return Object.keys(this.statsByCategory());
  });
}

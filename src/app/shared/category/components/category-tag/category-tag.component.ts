import { Component, computed, input } from '@angular/core';
import { TagComponent } from '@shared/components/tag/tag.component';

import { categoryToTagMap } from '../../config/category-to-tag.config';
import { TopicCategory } from '../../models/category.model';

@Component({
  selector: 'app-category-tag',
  standalone: true,
  imports: [TagComponent],
  templateUrl: './category-tag.component.html',
})
export class CategoryTagComponent {
  category = input.required<TopicCategory>();
  categoryConfig = computed(() => categoryToTagMap[this.category()]);
}

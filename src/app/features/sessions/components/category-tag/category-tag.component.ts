import { Component, input, computed } from '@angular/core';
import { categoryToTagMap, TopicCategory } from '../../models/category';
import { TagComponent } from '@shared/components/tag/tag.component';

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

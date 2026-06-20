import { Component, computed, input } from '@angular/core';
import { TagComponent } from '@shared/components/tag/tag.component';
import { categoryToTagMap, TopicCategory } from '../../models/category';

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

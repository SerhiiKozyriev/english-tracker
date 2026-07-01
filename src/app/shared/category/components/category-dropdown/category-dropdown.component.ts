import { Component, output } from '@angular/core';

import { categoryToTagMap } from '../../config/category-to-tag.config';
import { TopicCategory } from '../../models/category.model';

@Component({
  selector: 'app-category-dropdown',
  standalone: true,
  templateUrl: './category-dropdown.component.html',
  styleUrl: './category-dropdown.component.css',
})
export class CategoryDropdownComponent {
  protected readonly categoriesList = Object.entries(categoryToTagMap).map(([key, value]) => ({
    key: key as TopicCategory,
    label: value.label,
    variant: value.variant,
  }));

  categorySelected = output<TopicCategory>();

  protected readonly dropdownId = `category-menu-${Math.random().toString(36).substring(2, 9)}`;

  selectCategory(key: TopicCategory, popoverEl: HTMLElement) {
    this.categorySelected.emit(key);
    popoverEl.hidePopover();
  }
}

import { Component, model } from '@angular/core';

export interface FilterOption {
  value: string;
  label: string;
}

@Component({
  selector: 'app-word-filter',
  templateUrl: './word-filter.component.html',
  styleUrl: './word-filter.component.css',
})
export class WordFilterComponent {
  protected readonly filterOptions: FilterOption[] = [
    { value: 'all', label: 'all' },
    { value: 'learning', label: 'learning' },
    { value: 'learned', label: 'learned' },
  ];

  readonly value = model<string>();

  selectOption(value: string): void {
    this.value.set(value);
  }
}

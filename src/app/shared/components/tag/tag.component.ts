import { Component, input } from '@angular/core';

export type TagVariant = 'default' | 'success' | 'info' | 'warning' | 'danger' | 'accent';
export type TagMarker = 'none' | 'dot' | 'check';

@Component({
  selector: 'app-tag',
  standalone: true,
  templateUrl: './tag.component.html',
  styleUrl: './tag.component.css',
})
export class TagComponent {
  variant = input<TagVariant>('default');
  marker = input<TagMarker>('none');
}

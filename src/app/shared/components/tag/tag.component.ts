import { Component, input } from '@angular/core';

export type TagVariant = 'badge' | 'list-item';
export type TagMarker = 'none' | 'dot' | 'check';

@Component({
  selector: 'app-tag',
  standalone: true,
  templateUrl: './tag.component.html',
  styleUrl: './tag.component.scss',
  host: {
    '[attr.data-intent]': 'intent()',
    '[attr.data-variant]': 'variant()',
    '[class]': 'state()',
  },
})
export class TagComponent {
  intent = input<string>('default');
  label = input.required<string>();
  marker = input<TagMarker>('none');
  state = input<'active' | 'default'>('default');
  variant = input<TagVariant>('badge');
}

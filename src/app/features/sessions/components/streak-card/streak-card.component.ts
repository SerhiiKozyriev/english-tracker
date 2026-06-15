import { Component, input } from '@angular/core';

@Component({
  selector: 'app-streak-card',
  imports: [],
  templateUrl: './streak-card.component.html',
  styleUrl: './streak-card.component.css',
})
export class StreakCardComponent {
  streak = input.required<number>();
}

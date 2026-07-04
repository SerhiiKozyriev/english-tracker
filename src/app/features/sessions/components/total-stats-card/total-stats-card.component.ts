import { Component, input } from '@angular/core';
import { SessionStats } from '../../models/sessions';

@Component({
  selector: 'app-stats-card',
  standalone: true,
  templateUrl: './total-stats-card.component.html',
  styleUrls: ['./total-stats-card.component.css'],
})
export class TotalStatsCardComponent {
  stats = input<SessionStats | undefined>();
}

import { Component, model } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-session-search',
  imports: [FormsModule],
  templateUrl: './sessions-search.html',
  styleUrl: './sessions-search.css',
})
export class SessionsSearch {
  readonly value = model<string>('');
}

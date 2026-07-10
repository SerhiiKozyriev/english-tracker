import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '@core/index';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  private readonly router = inject(Router);

  showNavigation(): boolean {
    const url = this.router.url;
    return !url.includes('/auth') && !url.includes('/login') && !url.includes('/register');
  }
}

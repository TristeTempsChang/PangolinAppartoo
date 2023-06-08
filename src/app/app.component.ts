import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  hideHeaderFooter = true;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.hideHeaderFooter = event.url === '/login' || event.url === '/user';
        this.resetScrollPosition();
      }
    });
  }

  resetScrollPosition() {
    window.scrollTo(0, 0);
  }
}

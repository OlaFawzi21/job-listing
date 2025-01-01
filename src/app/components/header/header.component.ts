import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  isDarkTheme = false;

  ngOnInit() {
    const storedTheme = localStorage.getItem('isDarkTheme');
    if (storedTheme) {
      this.isDarkTheme = storedTheme === 'true';
      document.documentElement.classList.toggle('dark-theme', this.isDarkTheme);
    }
  }

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    document.documentElement.classList.toggle('dark-theme', this.isDarkTheme);
    localStorage.setItem('isDarkTheme', `${this.isDarkTheme}`);
  }
}

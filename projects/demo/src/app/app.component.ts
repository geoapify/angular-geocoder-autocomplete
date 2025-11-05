import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false
})
export class AppComponent implements OnInit {
  title = 'demo';
  selectedTheme = 'minimal';
  isIndexPage = true;

  constructor(private renderer: Renderer2, private router: Router) {}

  ngOnInit() {
    this.loadSavedTheme();
    
    // Listen to route changes to determine if we're on index page
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isIndexPage = event.url === '/demos' || event.url === '/';
      }
    });
  }

  selectDemo(demoType: 'address-form-one-field' | 'autocomplete-features-events') {
    if (demoType === 'address-form-one-field') {
      this.router.navigate(['/demos/address-form-one-field']);
    } else if (demoType === 'autocomplete-features-events') {
      this.router.navigate(['/demos/autocomplete-features-events']);
    }
  }

  setTheme(themeName: string) {
    const existingThemeLinks = document.querySelectorAll('link[data-geoapify-theme]');
    existingThemeLinks.forEach(link => link.remove());

    const themeLink = this.renderer.createElement('link');
    this.renderer.setAttribute(themeLink, 'rel', 'stylesheet');
    this.renderer.setAttribute(themeLink, 'type', 'text/css');
    this.renderer.setAttribute(themeLink, 'data-geoapify-theme', 'true');

    const cdnUrl = `https://unpkg.com/@geoapify/geocoder-autocomplete@3.0.0-rc.1/styles/${themeName}.css`;
    this.renderer.setAttribute(themeLink, 'href', cdnUrl);
    this.renderer.appendChild(document.head, themeLink);

    document.body.className = document.body.className.replace(/theme-\w+/g, '');
    this.renderer.addClass(document.body, `theme-${themeName}`);

    localStorage.setItem('geocoder-theme', themeName);
  }

  loadSavedTheme() {
    const savedTheme = localStorage.getItem('geocoder-theme') || 'minimal';
    this.selectedTheme = savedTheme;
    this.setTheme(savedTheme);
  }
}
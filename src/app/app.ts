import { Component } from '@angular/core';
import { NavComponent } from './features/nav/nav.component';
import { HeroComponent } from './features/hero/hero.component';
import { MenuSectionComponent } from './features/menu/menu-section.component';
import { AboutSectionComponent } from './features/about/about-section.component';
import { LocationSectionComponent } from './features/location/location-section.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NavComponent,
    HeroComponent,
    MenuSectionComponent,
    AboutSectionComponent,
    LocationSectionComponent,
  ],
  template: `
    <app-nav />
    <main>
      <app-hero />
      <app-menu-section />
      <app-about-section />
      <app-location-section />
    </main>
  `,
  styles: [`
    main { display: block; }
  `],
})
export class App {}

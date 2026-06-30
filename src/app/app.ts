import { Component } from '@angular/core';
import { NavComponent } from './features/nav/nav.component';
import { HeroComponent } from './features/hero/hero.component';
import { MenuSectionComponent } from './features/menu/menu-section.component';
import { AboutSectionComponent } from './features/about/about-section.component';
import { GallerySectionComponent } from './features/gallery/gallery-section.component';
import { ReservationSectionComponent } from './features/reservation/reservation-section.component';
import { FooterComponent } from './features/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NavComponent,
    HeroComponent,
    MenuSectionComponent,
    AboutSectionComponent,
    GallerySectionComponent,
    ReservationSectionComponent,
    FooterComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {}

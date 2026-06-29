import { Component } from '@angular/core';
import { RevealDirective } from '../../shared/directives/reveal.directive';

interface HoursRow {
  days: string;
  hours: string;
}

@Component({
  selector: 'app-location-section',
  standalone: true,
  imports: [RevealDirective],
  templateUrl: './location-section.component.html',
  styleUrl: './location-section.component.scss',
})
export class LocationSectionComponent {
  hours: HoursRow[] = [
    { days: 'Lunes – Viernes', hours: '7:00 – 17:00' },
    { days: 'Sábado', hours: '8:00 – 18:00' },
    { days: 'Domingo', hours: '9:00 – 15:00' },
  ];
}

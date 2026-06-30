import { Component } from '@angular/core';
import { RevealDirective } from '../../shared/directives/reveal.directive';

@Component({
  selector: 'app-about-section',
  standalone: true,
  imports: [RevealDirective],
  templateUrl: './about-section.component.html',
  styleUrl: './about-section.component.scss'
})
export class AboutSectionComponent {
  stats = [
    { value: '12', label: 'Años de tradición' },
    { value: '100%', label: 'Café mexicano' },
    { value: 'Diario', label: 'Horneado fresco' }
  ];
}

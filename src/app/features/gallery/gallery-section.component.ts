import { Component } from '@angular/core';
import { RevealDirective } from '../../shared/directives/reveal.directive';

@Component({
  selector: 'app-gallery-section',
  standalone: true,
  imports: [RevealDirective],
  templateUrl: './gallery-section.component.html',
  styleUrl: './gallery-section.component.scss'
})
export class GallerySectionComponent {
  images = [
    { url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=600&q=80', alt: 'Interior del café', size: 'large' },
    { url: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=600&q=80', alt: 'Cappuccino artesanal', size: 'small' },
    { url: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=600&q=80', alt: 'Repostería del día', size: 'small' },
    { url: 'https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?auto=format&fit=crop&w=600&q=80', alt: 'Barra de espresso', size: 'small' },
    { url: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=600&q=80', alt: 'Desayuno completo', size: 'wide' },
    { url: 'https://images.unsplash.com/photo-1464979681340-bdd28a61699e?auto=format&fit=crop&w=600&q=80', alt: 'Ambiente acogedor', size: 'small' },
    { url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&q=80', alt: 'Cold brew en vaso', size: 'small' },
    { url: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&w=600&q=80', alt: 'Pan artesanal', size: 'small' }
  ];
}

import {
  Component,
  ElementRef,
  afterNextRender,
  viewChild,
  viewChildren,
  OnDestroy
} from '@angular/core';
import { animate, stagger, onScroll, type JSAnimation, type ScrollObserver } from 'animejs';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { prefersReducedMotion } from '../../shared/utils/motion';

@Component({
  selector: 'app-gallery-section',
  standalone: true,
  imports: [RevealDirective],
  templateUrl: './gallery-section.component.html',
  styleUrl: './gallery-section.component.scss'
})
export class GallerySectionComponent implements OnDestroy {
  images = [
    { url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=600&q=80', alt: 'Café entre amigos' },
    { url: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=600&q=80', alt: 'Cappuccino artesanal' },
    { url: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80', alt: 'Repostería del día' },
    { url: 'https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?auto=format&fit=crop&w=600&q=80', alt: 'Interior del café' },
    { url: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&w=600&q=80', alt: 'Desayuno completo' }
  ];

  private grid = viewChild<ElementRef<HTMLElement>>('galleryGrid');
  private items = viewChildren<ElementRef<HTMLElement>>('galleryItem');
  private revealAnim?: JSAnimation;
  private observer?: ScrollObserver;

  constructor() {
    afterNextRender(() => this.revealOnScroll());
  }

  private revealOnScroll(): void {
    // En reduced-motion (o sin window) las fotos quedan visibles por CSS, sin animar.
    if (prefersReducedMotion()) return;

    const gridEl = this.grid()?.nativeElement;
    const els = this.items().map(ref => ref.nativeElement);
    if (!gridEl || !els.length) return;

    // Las polaroids entran deslizándose desde la derecha, escalonadas, una sola vez.
    this.observer = onScroll({ target: gridEl, enter: 'bottom-=100 top', repeat: false });
    this.revealAnim = animate(els, {
      opacity: [0, 1],
      translateX: [60, 0],
      duration: 620,
      delay: stagger(80),
      ease: 'outExpo',
      autoplay: this.observer
    });
  }

  ngOnDestroy(): void {
    this.revealAnim?.revert();
    this.observer?.revert();
  }
}

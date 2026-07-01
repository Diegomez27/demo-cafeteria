import { Component, ElementRef, afterNextRender, inject, OnDestroy } from '@angular/core';
import { animate, stagger, splitText, type JSAnimation, type TextSplitter } from 'animejs';
import { prefersReducedMotion } from '../../shared/utils/motion';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent implements OnDestroy {
  private host = inject<ElementRef<HTMLElement>>(ElementRef);
  private splitter?: TextSplitter;
  private headlineAnim?: JSAnimation;
  private introAnim?: JSAnimation;

  constructor() {
    // Corre una sola vez, al montar en el navegador (no en SSR ni en tests jsdom).
    afterNextRender(() => this.animateHeadline());
  }

  private animateHeadline(): void {
    if (prefersReducedMotion()) return;

    const title = this.host.nativeElement.querySelector<HTMLElement>('.hero__title');
    if (!title) return;

    // Parte el headline en palabras conservando <em> y <br>, luego fade-up escalonado.
    this.splitter = splitText(title, { words: true, chars: false });
    this.headlineAnim = animate(this.splitter.words, {
      opacity: [0, 1],
      translateY: [24, 0],
      duration: 700,
      delay: stagger(55),
      ease: 'outExpo'
    });

    // El resto del hero entra en cascada después del headline.
    const rest = this.host.nativeElement.querySelectorAll<HTMLElement>(
      '.hero__subtitle, .hero__actions, .hero__badge, .hero__stamp'
    );
    if (rest.length) {
      this.introAnim = animate(rest, {
        opacity: [0, 1],
        translateY: [18, 0],
        duration: 650,
        delay: stagger(100, { start: 420 }),
        ease: 'outExpo'
      });
    }
  }

  ngOnDestroy(): void {
    this.headlineAnim?.revert();
    this.introAnim?.revert();
    this.splitter?.revert();
  }
}

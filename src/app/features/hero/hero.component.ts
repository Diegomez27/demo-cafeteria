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
  }

  ngOnDestroy(): void {
    this.headlineAnim?.revert();
    this.splitter?.revert();
  }
}

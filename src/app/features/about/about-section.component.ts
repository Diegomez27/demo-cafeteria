import { Component, ElementRef, afterNextRender, inject, OnDestroy } from '@angular/core';
import { animate, onScroll, type JSAnimation, type ScrollObserver } from 'animejs';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { prefersReducedMotion } from '../../shared/utils/motion';

@Component({
  selector: 'app-about-section',
  standalone: true,
  imports: [RevealDirective],
  templateUrl: './about-section.component.html',
  styleUrl: './about-section.component.scss'
})
export class AboutSectionComponent implements OnDestroy {
  private host = inject<ElementRef<HTMLElement>>(ElementRef);
  private anims: JSAnimation[] = [];
  private observers: ScrollObserver[] = [];

  stats = [
    { value: '12', label: 'Años de tradición' },
    { value: '100%', label: 'Café mexicano' },
    { value: 'Diario', label: 'Horneado fresco' }
  ];

  constructor() {
    afterNextRender(() => this.animateStats());
  }

  /** Los stats numéricos cuentan de 0 a su valor al entrar al viewport; los de texto quedan tal cual. */
  private animateStats(): void {
    if (prefersReducedMotion()) return;

    const els = this.host.nativeElement.querySelectorAll<HTMLElement>('.about__stat-value');
    els.forEach(el => {
      const raw = el.textContent?.trim() ?? '';
      const target = parseFloat(raw);
      if (Number.isNaN(target)) return;

      const suffix = raw.replace(/^[\d.]+/, '');
      const counter = { value: 0 };
      el.textContent = `0${suffix}`;

      const observer = onScroll({ target: el, enter: 'bottom-=60 top', repeat: false });
      this.observers.push(observer);
      this.anims.push(
        animate(counter, {
          value: target,
          duration: 1500,
          ease: 'outExpo',
          autoplay: observer,
          onUpdate: () => {
            el.textContent = `${Math.round(counter.value)}${suffix}`;
          }
        })
      );
    });
  }

  ngOnDestroy(): void {
    this.anims.forEach(a => a.revert());
    this.observers.forEach(o => o.revert());
  }
}

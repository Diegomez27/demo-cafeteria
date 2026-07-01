import {
  Component,
  ElementRef,
  signal,
  computed,
  effect,
  viewChild,
  viewChildren,
  OnDestroy
} from '@angular/core';
import { animate, stagger, type JSAnimation } from 'animejs';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { prefersReducedMotion } from '../../shared/utils/motion';
import menuData from '../../shared/data/menu.json';

interface MenuItem {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  tag: string | null;
}

@Component({
  selector: 'app-menu-section',
  standalone: true,
  imports: [RevealDirective],
  templateUrl: './menu-section.component.html',
  styleUrl: './menu-section.component.scss'
})
export class MenuSectionComponent implements OnDestroy {
  // Sin "Todos": cada categoría es una hoja de la carta.
  categories = menuData.categories.filter(cat => cat !== 'Todos');
  activeCategory = signal(this.categories[0]);

  private page = viewChild<ElementRef<HTMLElement>>('menuPage');
  private menuItems = viewChildren<ElementRef<HTMLElement>>('menuItem');
  private pageInAnim?: JSAnimation;
  private pageOutAnim?: JSAnimation;
  private enterAnim?: JSAnimation;
  private firstRender = true;

  filteredItems = computed<MenuItem[]>(() =>
    menuData.items.filter(item => item.category === this.activeCategory())
  );

  constructor() {
    // Cuando el swap de categoría ya renderizó la hoja nueva, ésta "cae" girando
    // desde el lomo izquierdo y sus platillos entran escalonados.
    effect(() => {
      const els = this.menuItems().map(ref => ref.nativeElement);
      if (this.firstRender) {
        this.firstRender = false;
        return;
      }
      if (prefersReducedMotion() || !els.length) return;

      const pageEl = this.page()?.nativeElement;
      this.pageInAnim?.revert();
      this.enterAnim?.revert();

      if (pageEl) {
        this.pageInAnim = animate(pageEl, {
          rotateY: [-65, 0],
          duration: 480,
          ease: 'outCubic'
        });
      }
      this.enterAnim = animate(els, {
        opacity: [0, 1],
        translateY: [10, 0],
        duration: 380,
        delay: stagger(45, { start: 140 }),
        ease: 'outExpo'
      });
    });
  }

  setCategory(cat: string): void {
    if (cat === this.activeCategory()) return;

    if (prefersReducedMotion()) {
      this.activeCategory.set(cat);
      return;
    }

    // La hoja actual se levanta girando sobre el lomo; al terminar se hace el swap.
    const pageEl = this.page()?.nativeElement;
    if (!pageEl) {
      this.activeCategory.set(cat);
      return;
    }

    this.pageOutAnim?.revert();
    this.pageOutAnim = animate(pageEl, {
      rotateY: [0, -65],
      duration: 240,
      ease: 'inCubic',
      onComplete: () => this.activeCategory.set(cat)
    });
  }

  ngOnDestroy(): void {
    this.pageInAnim?.revert();
    this.pageOutAnim?.revert();
    this.enterAnim?.revert();
  }
}

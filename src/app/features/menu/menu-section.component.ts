import {
  Component,
  ElementRef,
  signal,
  computed,
  effect,
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
  categories = menuData.categories;
  activeCategory = signal('Todos');

  private menuItems = viewChildren<ElementRef<HTMLElement>>('menuItem');
  private enterAnim?: JSAnimation;
  private exitAnim?: JSAnimation;
  private firstRender = true;

  filteredItems = computed<MenuItem[]>(() => {
    const cat = this.activeCategory();
    return cat === 'Todos'
      ? menuData.items
      : menuData.items.filter(item => item.category === cat);
  });

  constructor() {
    // Cuando el swap de categoría ya renderizó los nuevos items, los hace entrar
    // escalonados. viewChildren se actualiza después del render, no antes.
    effect(() => {
      const els = this.menuItems().map(ref => ref.nativeElement);
      if (this.firstRender) {
        this.firstRender = false;
        return;
      }
      if (prefersReducedMotion() || !els.length) return;

      this.enterAnim?.revert();
      this.enterAnim = animate(els, {
        opacity: [0, 1],
        translateY: [12, 0],
        duration: 420,
        delay: stagger(50),
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

    // Salida corta de los items actuales; al terminar, recién se hace el swap.
    const current = this.menuItems().map(ref => ref.nativeElement);
    this.exitAnim?.revert();
    this.exitAnim = animate(current, {
      opacity: [1, 0],
      translateY: [0, -6],
      duration: 150,
      ease: 'outQuad',
      onComplete: () => this.activeCategory.set(cat)
    });
  }

  ngOnDestroy(): void {
    this.enterAnim?.revert();
    this.exitAnim?.revert();
  }
}

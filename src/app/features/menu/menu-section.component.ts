import { Component, signal, computed } from '@angular/core';
import { RevealDirective } from '../../shared/directives/reveal.directive';
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
export class MenuSectionComponent {
  categories = menuData.categories;
  activeCategory = signal('Todos');

  filteredItems = computed<MenuItem[]>(() => {
    const cat = this.activeCategory();
    return cat === 'Todos'
      ? menuData.items
      : menuData.items.filter(item => item.category === cat);
  });

  setCategory(cat: string) {
    this.activeCategory.set(cat);
  }
}

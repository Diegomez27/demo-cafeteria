import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevealDirective } from '../../shared/directives/reveal.directive';

export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: string;
  tag?: string;
  image: string;
}

@Component({
  selector: 'app-menu-section',
  standalone: true,
  imports: [CommonModule, RevealDirective],
  templateUrl: './menu-section.component.html',
  styleUrl: './menu-section.component.scss',
})
export class MenuSectionComponent {
  activeCategory = signal<'breakfast' | 'brunch' | 'drinks'>('breakfast');

  categories: { key: 'breakfast' | 'brunch' | 'drinks'; label: string }[] = [
    { key: 'breakfast', label: 'Desayuno' },
    { key: 'brunch', label: 'Brunch' },
    { key: 'drinks', label: 'Bebidas' },
  ];

  items: Record<'breakfast' | 'brunch' | 'drinks', MenuItem[]> = {
    breakfast: [
      {
        id: 1,
        name: 'Tostadas de Aguacate',
        description: 'Pan de masa madre, aguacate, huevo pochado, semillas de chía y aceite de oliva extra virgen.',
        price: '$165',
        tag: 'Favorito',
        image: 'https://images.unsplash.com/photo-1588137378633-dea1336ce1e2?w=600&q=80&auto=format&fit=crop',
      },
      {
        id: 2,
        name: 'Bowl Matina',
        description: 'Granola artesanal, yogurt griego, frutos rojos frescos, miel de abeja y almendras tostadas.',
        price: '$145',
        image: 'https://images.unsplash.com/photo-1608032364895-84208a8b6f9e?w=600&q=80&auto=format&fit=crop',
      },
      {
        id: 3,
        name: 'Huevos Benedictinos',
        description: 'Muffin inglés, jamón serrano, huevos pochados y salsa holandesa casera.',
        price: '$185',
        tag: 'Chef',
        image: 'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?w=600&q=80&auto=format&fit=crop',
      },
    ],
    brunch: [
      {
        id: 4,
        name: 'Pancakes de Arándano',
        description: 'Esponjosos pancakes con arándanos frescos, mantequilla de maple y crema batida.',
        price: '$155',
        tag: 'Favorito',
        image: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=600&q=80&auto=format&fit=crop',
      },
      {
        id: 5,
        name: 'Tabla de Brunch',
        description: 'Selección de quesos, charcutería, frutas de temporada, mermeladas artesanales y pan horneado.',
        price: '$295',
        image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=80&auto=format&fit=crop',
      },
      {
        id: 6,
        name: 'Croque Madame',
        description: 'Sándwich gratinado de jamón y gruyère con huevo frito sobre pan brioche dorado.',
        price: '$175',
        image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=600&q=80&auto=format&fit=crop',
      },
    ],
    drinks: [
      {
        id: 7,
        name: 'Flat White',
        description: 'Doble ristretto con leche vaporizada en textura sedosa. Origen: Etiopía Yirgacheffe.',
        price: '$75',
        tag: 'Especialidad',
        image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&q=80&auto=format&fit=crop',
      },
      {
        id: 8,
        name: 'Matcha Latte',
        description: 'Matcha ceremonial japonés con leche de avena vaporizada y toque de vainilla natural.',
        price: '$85',
        image: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=600&q=80&auto=format&fit=crop',
      },
      {
        id: 9,
        name: 'Cold Brew Tónico',
        description: 'Cold brew de 24 hrs sobre tónica artesanal, con espuma de naranja y piel cítrica.',
        price: '$95',
        tag: 'Nuevo',
        image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=600&q=80&auto=format&fit=crop',
      },
    ],
  };

  get currentItems(): MenuItem[] {
    return this.items[this.activeCategory()];
  }

  setCategory(cat: 'breakfast' | 'brunch' | 'drinks'): void {
    this.activeCategory.set(cat);
  }
}

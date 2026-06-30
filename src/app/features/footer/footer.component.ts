import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  currentYear = new Date().getFullYear();

  horarios = [
    { dias: 'Lunes – Viernes', horas: '8:00 – 21:00' },
    { dias: 'Sábado', horas: '9:00 – 22:00' },
    { dias: 'Domingo', horas: '9:00 – 19:00' }
  ];
}

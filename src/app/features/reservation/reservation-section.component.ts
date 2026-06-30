import { Component, signal, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RevealDirective } from '../../shared/directives/reveal.directive';

@Component({
  selector: 'app-reservation-section',
  standalone: true,
  imports: [ReactiveFormsModule, RevealDirective],
  templateUrl: './reservation-section.component.html',
  styleUrl: './reservation-section.component.scss'
})
export class ReservationSectionComponent {
  private fb = inject(FormBuilder);

  submitted = signal(false);

  form = this.fb.nonNullable.group({
    nombre: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    telefono: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
    fecha: ['', Validators.required],
    hora: ['', Validators.required],
    personas: ['2', Validators.required],
    mensaje: ['']
  });

  horas = [
    '9:00', '9:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30'
  ];

  minDate = new Date().toISOString().split('T')[0];

  isInvalid(field: string) {
    const ctrl = this.form.get(field);
    return ctrl?.invalid && ctrl?.touched;
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitted.set(true);
  }

  reset() {
    this.form.reset({ personas: '2' });
    this.submitted.set(false);
  }
}

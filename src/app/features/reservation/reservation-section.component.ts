import {
  Component,
  ElementRef,
  signal,
  inject,
  afterNextRender,
  afterRenderEffect,
  OnDestroy
} from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import {
  animate,
  stagger,
  onScroll,
  svg,
  type JSAnimation,
  type ScrollObserver
} from 'animejs';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { prefersReducedMotion } from '../../shared/utils/motion';

@Component({
  selector: 'app-reservation-section',
  standalone: true,
  imports: [ReactiveFormsModule, RevealDirective],
  templateUrl: './reservation-section.component.html',
  styleUrl: './reservation-section.component.scss'
})
export class ReservationSectionComponent implements OnDestroy {
  private fb = inject(FormBuilder);
  private host = inject<ElementRef<HTMLElement>>(ElementRef);

  private fieldsAnim?: JSAnimation;
  private formObserver?: ScrollObserver;
  private blobAnim?: JSAnimation;
  private checkAnim?: JSAnimation;

  submitted = signal(false);

  constructor() {
    afterNextRender(() => this.animateFormEntrance());

    // Cuando el estado de éxito ya está en el DOM, dibuja el check y hace pop al blob.
    afterRenderEffect(() => {
      if (this.submitted()) this.animateSuccess();
    });
  }

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

  private animateFormEntrance(): void {
    if (prefersReducedMotion()) return;

    const wrap = this.host.nativeElement.querySelector<HTMLElement>('.reservation__form-wrap');
    const fields = this.host.nativeElement.querySelectorAll<HTMLElement>(
      '.res-form__field, .res-form__submit'
    );
    if (!wrap || !fields.length) return;

    // Los campos entran escalonados cuando la tarjeta llega al viewport.
    this.formObserver = onScroll({ target: wrap, enter: 'bottom-=80 top', repeat: false });
    this.fieldsAnim = animate(fields, {
      opacity: [0, 1],
      translateY: [14, 0],
      duration: 550,
      delay: stagger(60),
      ease: 'outExpo',
      autoplay: this.formObserver
    });
  }

  private animateSuccess(): void {
    if (prefersReducedMotion()) return;

    const blob = this.host.nativeElement.querySelector<HTMLElement>('.res-success__blob');
    const check = this.host.nativeElement.querySelector<SVGPathElement>('.res-success__check path');
    if (!blob || !check) return;

    this.blobAnim = animate(blob, {
      scale: [0.5, 1],
      opacity: [0, 1],
      duration: 500,
      ease: 'outBack'
    });
    this.checkAnim = animate(svg.createDrawable(check), {
      draw: ['0 0', '0 1'],
      duration: 600,
      delay: 200,
      ease: 'outQuart'
    });
  }

  ngOnDestroy(): void {
    this.fieldsAnim?.revert();
    this.formObserver?.revert();
    this.blobAnim?.revert();
    this.checkAnim?.revert();
  }
}

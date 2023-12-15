import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'

@Component({
  standalone: true,
  selector: 'utf-credits',
  imports: [CommonModule],
  template: `
    <div
      [ngClass]="[
        'p-4',
        'border-4 border-dotted border-primary',
        'flex flex-col gap-3',
        'text-center',
        '[&>p]:leading-none'
      ]"
    >
      <p>
        Trabajo realizado para la asignatura Teoría de Códigos y Criptografía
        para el grado
        <a href="https://www.fi.upm.es/?id=gradomatematicasinformatica"
          >Matemáticas e Informática</a
        >
        de la
        <a href="https://www.upm.es/">Universidad Politécnica de Madrid</a>, por
        parte de los alumnos:
      </p>

      <p class="text-4xl">Julio César Castro López</p>
      <p class="text-4xl">Diego José Abengózar Vilar</p>
    </div>
  `,
})
export class CreditsComponent {}

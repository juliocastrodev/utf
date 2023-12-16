import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { LinkComponent } from '../../../../shared/components/link/link.component'

@Component({
  standalone: true,
  selector: 'utf-credits',
  imports: [CommonModule, LinkComponent],
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
        <utf-link href="https://www.fi.upm.es/?id=gradomatematicasinformatica"
          >Matemáticas e Informática</utf-link
        >
        de la
        <utf-link href="https://www.upm.es/"
          >Universidad Politécnica de Madrid</utf-link
        >, por parte de los alumnos:
      </p>

      <p class="text-4xl">Julio César Castro López</p>
      <p class="text-4xl">Diego José Abengózar Vilar</p>
    </div>
  `,
})
export class CreditsComponent {}

import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ButtonComponent } from '../../../../shared/components/buttons/buttons';

export interface CobroModalData {
  unidadId: string;
  nombreUnidad: string;
  saldoRestante: number;
}

@Component({
  selector: 'app-cobro-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ButtonComponent
  ],
  templateUrl: './cobro-modal.html',
  styleUrl: './cobro-modal.scss'
})
export class CobroModalComponent implements OnInit {
  cobroForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    // MatDialogRef es provisto dinámicamente por Angular Material
    public dialogRef: MatDialogRef<CobroModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CobroModalData
  ) { }

  ngOnInit(): void {
    // Configuración robusta del formulario reactivo
    this.cobroForm = this.fb.group({
      montoAbono: [
        null, // Valor inicial
        [
          Validators.required,
          Validators.min(1),
          Validators.max(this.data.saldoRestante)
        ]
      ]
    });
  }

  // Getter auxiliar para facilitar lecturas de la plantilla HTML
  get montoControl() {
    return this.cobroForm.get('montoAbono');
  }

  onCancel(): void {
    // Cerramos explícitamente enviando null (acción abortada)
    this.dialogRef.close(null);
  }

  onConfirm(): void {
    if (this.cobroForm.valid) {
      // Retornamos de forma rigurosa el valor de abono ya convertido en number gracias al input[type=number]
      const montoIngresado = Number(this.cobroForm.value.montoAbono);
      this.dialogRef.close(montoIngresado);
    } else {
      this.cobroForm.markAllAsTouched();
    }
  }
}


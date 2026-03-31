import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SweetAlertService {
  /**
   * Muestra un Toast de éxito en la esquina superior derecha
   * No bloquea la UI, desaparece a los 3 segundos.
   */
  toastSuccess(mensaje: string): void {
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'success',
      title: mensaje,
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true
    });
  }

  /**
   * Muestra un Modal clásico centrado de error.
   */
  alertaError(titulo: string, mensaje: string): void {
    Swal.fire({
      icon: 'error',
      title: titulo,
      text: mensaje,
      // Intentamos heredar el azul primario del SaaS para coherencia visual en diálogos nativos.
      confirmButtonColor: 'var(--primary, #4F46E5)'
    });
  }

  /**
   * Modal de Advertencia (Warning) ideal para interceptar Acciones Críticas (como Borrados).
   * @returns Un booleano reactivo con la confirmación.
   */
  confirmarAccion(titulo: string, texto: string, confirmText: string = 'Confirmar'): Promise<boolean> {
    return Swal.fire({
      title: titulo,
      text: texto,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'var(--danger, #EF4444)',
      cancelButtonColor: 'var(--secondary, #6B7280)',
      confirmButtonText: confirmText,
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      return result.isConfirmed;
    });
  }
}

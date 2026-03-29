import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ElementRef, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableColumn } from './interface/table-column';
import { TableOptions } from './interface/table-options';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.html',
  styleUrl: './table.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent<T extends { [key: string]: any }> {

  // Controla cuando se está cargando
  @Input() loading: boolean = false;

  @Input() data: T[] = [];
  @Input() columnas: TableColumn<T>[] = [];

  // Paginación
  @Input() page: number = 1; // Renombrado internamente para convención estándar
  @Input() totalPaginas: number = 1;
  @Input() totalItems: number = 0;
  @Input() pageSize: number = 10;

  @Output() paginaChange = new EventEmitter<number>();

  @Input() acciones: TableOptions<T>[] = [];
  @Output() accionClick = new EventEmitter<{ accion: string, item: T }>();

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  // Paginación: emite al padre (Minimalista)
  paginaAnterior() {
    if (this.page > 1) {
      this.paginaChange.emit(this.page - 1);
    }
  }

  paginaSiguiente() {
    if (this.page < this.totalPaginas) {
      this.paginaChange.emit(this.page + 1);
    }
  }

  trackByIndex(_index: number, item: any) { // trackBy para *ngFor
    return item?.id ?? _index;
  }

  onAccionClick(item: T, action: TableOptions<T>) {
    if (action.condition(item)) {
      action.handler(item); // Ejecuta la función del padre
      this.accionClick.emit({ accion: action.label, item });
    }
  }
}

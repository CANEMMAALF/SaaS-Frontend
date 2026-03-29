import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from '../../../shared/components/table/table';
import { TableColumn } from '../../../shared/components/table/interface/table-column';
import { TableOptions } from '../../../shared/components/table/interface/table-options';
import { BreadcrumbComponent, BreadcrumbItem } from '../../../shared/components/breadcrumb/breadcrumb';
import { MOCK_PROPIEDADES } from '../../../shared/components/table/json/mock-propiedades';

interface PropiedadMock {
  id: string;
  unidad: string;
  inquilino: string;
  renta: string;
  estado: string;
}

@Component({
  selector: 'app-property-list',
  standalone: true,
  imports: [CommonModule, TableComponent, BreadcrumbComponent],
  templateUrl: './property-list.html',
  styleUrl: './property-list.css',
})
export class PropertyList implements OnInit {
  isLoading = false;
  
  breadcrumbs: BreadcrumbItem[] = [
    { label: 'Propiedades', url: '/propiedades' },
    { label: 'Listado', url: '/propiedades/lista', isLast: true }
  ];

  misPropiedades: PropiedadMock[] = [];
  
  tableColumns: TableColumn<PropiedadMock>[] = [
    { key: 'unidad', header: 'Unidad' },
    { key: 'inquilino', header: 'Inquilino / Cliente' },
    { key: 'renta', header: 'Cuota / Renta' },
    { key: 'estado', header: 'Estado Principal' }
  ];

  tableActions: TableOptions<PropiedadMock>[] = [
    {
      label: 'Detalles',
      condition: () => true,
      handler: (item) => alert('Viendo detalles de: ' + item.unidad),
      cssClass: 'btn-action-primary'
    },
    {
      label: 'Cobrar',
      condition: (item) => item.estado === 'PENDIENTE',
      handler: (item) => alert('Generando cargo para: ' + item.unidad),
      cssClass: 'btn-action-warning'
    }
  ];

  // Inyectamos ChangeDetectorRef para notificar a la vista cuando los datos asíncronos cambien
  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.isLoading = true;
    
    // Simuladores de carga asincrona para alimentar el OnPush del TableComponent
    setTimeout(() => {
      // Clonemos el mock para obligar la detección de referencias
      this.misPropiedades = [...MOCK_PROPIEDADES];
      this.isLoading = false;
      
      // Notificamos explícitamente a Angular que la data cambió para apagar el "Cargando datos..."
      this.cdr.detectChanges();
    }, 1500);
  }

  onPageChange(newPage: number) {
    console.log('Cambiando a pagina:', newPage);
  }

  onActionClicked(event: any) {
    console.log('Se ejecutó accion general:', event);
  }
}

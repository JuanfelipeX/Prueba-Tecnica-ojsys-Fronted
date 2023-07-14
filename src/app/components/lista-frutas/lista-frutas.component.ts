import { Component, OnInit } from '@angular/core';
import { FrutaService } from 'src/app/services/fruta/fruta.service';

@Component({
  selector: 'app-lista-frutas',
  templateUrl: './lista-frutas.component.html',
  styleUrls: ['./lista-frutas.component.css']
})
export class ListaFrutasComponent implements OnInit {
  frutas: any[] = []; // Arreglo para almacenar las frutas
  pageSizeOptions: number[] = [10, 20, 50]; // Opciones para el selector de tamaño de página
  pageSize: number = 10; // Tamaño de página por defecto
  currentPage: number = 1; // Página actual
  filterType: string = ''; // Valor del filtro por tipo de fruta
  totalPages: number = 0; // Definición de la propiedad totalPages

  isModalOpen: boolean = false; // Variable para controlar la apertura/cierre del modal
  nuevaFruta: any = {}; // Objeto para almacenar los datos de la nueva fruta

  constructor(private frutaService: FrutaService) { }

  ngOnInit() {
    this.getFrutas();
  }

  // Obtener la lista de frutas desde el servicio
  getFrutas() {
    this.frutaService.obtenerFrutas()
      .subscribe((response: any) => {
        this.frutas = response.frutas;
        this.totalPages = response.totalPages;
      });
  }

  // Cambiar el tamaño de página
  changePageSize() {
    this.currentPage = 1; // Reiniciar a la primera página al cambiar el tamaño de página
    this.getFrutas();
  }

  // Cambiar la página actual
  changePage(page: number) {
    this.currentPage = page;
    this.getFrutas();
  }

  // Aplicar el filtro por tipo de fruta
  applyFilter() {
    this.currentPage = 1; // Reiniciar a la primera página al aplicar el filtro
    this.getFrutas();
  }

  // Abrir el modal para agregar una nueva fruta
  openModal() {
    this.isModalOpen = true;
    this.nuevaFruta = {}; // Reiniciar los datos de la nueva fruta
  }

  // Cerrar el modal
  closeModal() {
    this.isModalOpen = false;
  }

  // Crear una nueva fruta
  crearFruta() {
    this.frutaService.crearFruta(this.nuevaFruta)
      .subscribe(response => {
        // Realizar acciones después de crear la fruta, como cerrar el modal,
        // actualizar la lista de frutas, etc.
        this.closeModal();
        this.getFrutas();
      });
    this.closeModal();
  }
}

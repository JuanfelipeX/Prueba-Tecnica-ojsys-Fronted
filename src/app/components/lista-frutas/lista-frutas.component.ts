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
  frutasCompletas: any;

  constructor(private frutaService: FrutaService) { }

  ngOnInit() {
    this.getFrutas();
    this.applyFilter();
  }

  // Obtener la lista de frutas desde el servicio
  getFrutas() {
    this.frutaService.obtenerFrutas()
      .subscribe((response: any) => {
        this.frutasCompletas = response.frutas;
        this.frutas = response.frutas;
        this.totalPages = response.totalPages;
        this.applyFilter(); // Aplicar el filtro por tipo de fruta
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
    if (this.filterType && this.filterType.trim() !== '') {
      this.frutas = this.frutasCompletas.filter((fruta: { tipo: any; }) =>
        fruta.tipo && fruta.tipo.toLowerCase().includes(this.filterType.toLowerCase())
      );
    } else {
      this.frutas = this.frutasCompletas;
    }
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

  // // Eliminar una fruta
  // eliminarFruta() {
  //   this.frutaService.eliminarFruta(this.frutaSeleccionada.id)
  //     .subscribe(response => {
  //       // Realizar acciones después de eliminar la fruta, como cerrar el modal,
  //       // actualizar la lista de frutas, etc.
  //       this.closeDeleteModal();
  //       this.getFrutas();
  //     });
  // }

  // Editar una fruta
  // editarFruta() {
  //   // Lógica para consumir el servicio y editar la fruta
  //   // Aquí debes agregar la lógica para consumir el servicio de edición de frutas
  //   // utilizando los datos de this.frutaSeleccionada
  //   // Una vez que se haya editado la fruta, puedes cerrar el modal:
  //   this.closeModal();
  // }

}

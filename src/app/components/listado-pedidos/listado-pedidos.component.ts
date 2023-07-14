import { Component, OnInit } from '@angular/core';
import { FrutaService } from 'src/app/services/fruta/fruta.service';
import { PedidosService } from 'src/app/services/pedidos/pedidos.service';

@Component({
  selector: 'app-listado-pedidos',
  templateUrl: './listado-pedidos.component.html',
  styleUrls: ['./listado-pedidos.component.css']
})
export class ListadoPedidosComponent implements OnInit {
  pedidos: any[] = []; // Arreglo para almacenar los pedidos

  isFrutasModalOpen: boolean = false; // Variable para controlar la apertura/cierre del modal de frutas
  frutasModal: any[] = []; // Arreglo para almacenar las frutas del pedido seleccionado

  isRegistrarPedidoModalOpen: boolean = false; // Variable para controlar la apertura/cierre del modal de registrar pedido
  frutasDisponibles: any[] = []; // Arreglo para almacenar las frutas disponibles
  frutaSeleccionada: any = null; // Variable para almacenar la fruta seleccionada
  cantidad: number = 0; // Variable para almacenar la cantidad de frutas seleccionadas

  constructor(private pedidoService: PedidosService, private frutaService: FrutaService) { }

  ngOnInit() {
    this.getPedidos();
    this.getFrutasDisponibles();
  }

  // Obtener la lista de pedidos desde el servicio
  getPedidos() {
    this.pedidoService.obtenerPedidos()
      .subscribe((response: any) => {
        if (Array.isArray(response)) {
          this.pedidos = response;
        } else {
          this.pedidos = [response]; // Convertir el objeto de pedido en un arreglo con un solo elemento
        }
      });
  }

  // Obtener la lista de frutas disponibles desde el servicio
  getFrutasDisponibles() {
    this.frutaService.obtenerFrutas()
      .subscribe((response: any) => {
        if (Array.isArray(response)) {
          this.frutasDisponibles = response;
        } else {
          this.frutasDisponibles = [response]; // Convertir el objeto de fruta en un arreglo con un solo elemento
        }
      });
  }

  // Abrir el modal de frutas del pedido
  openFrutasModal(frutas: any[]) {
    this.frutasModal = frutas;
    this.isFrutasModalOpen = true;
  }

  // Cerrar el modal de frutas del pedido
  closeFrutasModal() {
    this.isFrutasModalOpen = false;
  }

  // Abrir el modal de registrar pedido
  openRegistrarPedidoModal() {
    this.isRegistrarPedidoModalOpen = true;
    this.frutaSeleccionada = null;
    this.cantidad = 0;
  }

  // Cerrar el modal de registrar pedido
  closeRegistrarPedidoModal() {
    this.isRegistrarPedidoModalOpen = false;
  }

  // Agregar fruta al pedido
  agregarFruta() {
    // Realizar acciones para agregar la fruta al pedido, como almacenarla en el arreglo de frutas del pedido
    // y actualizar el valor total, etc.
    // Luego, cerrar el modal de registrar pedido:
    this.closeRegistrarPedidoModal();
  }
}
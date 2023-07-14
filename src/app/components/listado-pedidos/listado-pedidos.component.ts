import { Component, OnInit } from '@angular/core';
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

  constructor(private pedidoService: PedidosService) { }

  ngOnInit() {
    this.getPedidos();
  }

  // Obtener la lista de pedidos desde el servicio
  getPedidos() {
    this.pedidoService.obtenerPedidos()
      .subscribe((response: any) => {
        this.pedidos = response;
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
}

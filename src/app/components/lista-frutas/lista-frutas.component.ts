import { Component, OnInit } from '@angular/core';
import { FrutaService } from 'src/app/services/fruta/fruta.service';

@Component({
  selector: 'app-lista-frutas',
  templateUrl: './lista-frutas.component.html',
  styleUrls: ['./lista-frutas.component.css']
})
export class ListaFrutasComponent implements OnInit {
  frutas: any[] = [];
  pageSizeOptions: number[] = [10, 20, 50];
  pageSize: number = 10;
  currentPage: number = 1;
  filterType: string = '';
  totalPages: number = 0;

  constructor(private frutaService: FrutaService) { }

  ngOnInit() {
    this.getFrutas();
  }

  getFrutas() {
    this.frutaService.obtenerFrutas()
      .subscribe((response: any) => {
        this.frutas = response.frutas;
        this.totalPages = response.totalPages;
      });
  }

  changePageSize() {
    this.currentPage = 1;
    this.getFrutas();
  }

  changePage(page: number) {
    this.currentPage = page;
    this.getFrutas();
  }

  applyFilter() {
    this.currentPage = 1;
    this.getFrutas();
  }
}

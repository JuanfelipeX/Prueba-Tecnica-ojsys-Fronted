import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TercerosService } from 'src/app/services/terceros/terceros.service';

@Component({
  selector: 'app-terceros',
  templateUrl: './terceros.component.html',
  styleUrls: ['./terceros.component.css']
})
export class TercerosComponent implements OnInit {

  formulario: any = {};

  constructor(
    private tercerosService: TercerosService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  /*
  ************************************************
  *              REGISTRAR TERCEROS              *
  ************************************************
  */
  registrarPedido() {
    this.tercerosService.crearTerceros(this.formulario).subscribe({
      next: (data) => {
        console.log("Tercero Registrado");
      },
      error: (err) => {
        console.log("Tercero NO Registrado");
      },
    });
  }
}

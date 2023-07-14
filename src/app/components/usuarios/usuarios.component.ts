import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IniciarSesionService } from 'src/app/services/iniciar-sesion/iniciar-sesion.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  formulario: any[] = [];

  // variable para almacenar la consulta de búsqueda
  query: string = '';


  constructor(
    private iniciarSesionService: IniciarSesionService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  /*
  ************************************************
  *                 Traer Usuarios               *
  * **********************************************
  * */
  getUsers() {
    this.iniciarSesionService.obtenerUser().subscribe({
      next: (data) => {
        if (this.query) {
          // filtra los elementos de la lista según la consulta de búsqueda
          this.formulario = data.filter((element: any) =>
            element.name.toLowerCase().includes(this.query.toLowerCase())
          );
        } else {
          this.formulario = data;
        }
      },
      error: (err) => { },
    });
  }

  /*
************************************************
*                    BUSQUEDA                  *
************************************************
*/
  onSearch(value: string) {
    if (value && value.length > 3) {
      this.query = value; // actualiza la variable de consulta
      this.getUsers(); // filtra la lista de herramientas
    } else {
      this.query = '';
      this.getUsers();
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/servicio/crud.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-listar-empleado',
  templateUrl: './listar-empleado.component.html',
  styleUrls: ['./listar-empleado.component.css']
})
export class ListarEmpleadoComponent implements OnInit {

  Empleados: any;

  constructor(
    private crudService: CrudService
  ) { }

  ngOnInit(): void {
    this.crudService.ObtenerEmpleados().subscribe(respuesta => {
      console.log(respuesta);
      let API= this.crudService.API+"../images/";
      console.log(API);
      this.Empleados = respuesta;

    });
  }


  borrarRegistro(Id: any, iControl: any) {
    console.log(Id);
    console.log(iControl);
    if (window.confirm("Desea borra el registro?")) {
      this.crudService.BorrarEmpleados(Id).subscribe((respuesta) => {

        Swal.fire({
          title: '',
          text: 'Registro eliminado correctamente',
          icon: 'error',
          showConfirmButton: false,
          timer: 1500
        })

        this.Empleados.splice(iControl, 1);
      });
    }
  }

}

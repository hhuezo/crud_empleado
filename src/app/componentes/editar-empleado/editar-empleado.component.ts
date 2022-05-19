import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CrudService } from 'src/app/servicio/crud.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-empleado',
  templateUrl: './editar-empleado.component.html',
  styleUrls: ['./editar-empleado.component.css']
})
export class EditarEmpleadoComponent implements OnInit {
  form:FormGroup;
  Id: any;

  constructor(    private activeRoute: ActivatedRoute, private crudService:CrudService ,public formulario:FormBuilder,  private ruteador:Router) {
    this.Id = this.activeRoute.snapshot.paramMap.get('id');
    //console.log(this.Id);

    this.crudService.ObtenerEmpleadoById(this.Id).subscribe(
      respuesta=>{
       // console.log(respuesta);
        this.form.setValue({
          Nombre:respuesta[0]['Nombre'],
          Apellido:respuesta[0]['Apellido'],
          Foto:respuesta[0]['Foto'],
        });

      }
    );

    this.form= this.formulario.group({
      Nombre:[''],
      Apellido:[''],
      Foto:[''],
    });
  }

  ngOnInit(): void {
  }


  enviarDatos():any{
  // console.log(this.Id);
   // console.log(this.form.value);
    this.crudService.EditarEmpleadoById(this.Id,this.form.value).subscribe(()=>{});

    Swal.fire({
      title: '',
      text: 'Registro modificado correctamente',
      icon: 'info',
      showConfirmButton: false,
      timer: 1500
    })

    this.ruteador.navigateByUrl('/listar-empleado')
  }

}

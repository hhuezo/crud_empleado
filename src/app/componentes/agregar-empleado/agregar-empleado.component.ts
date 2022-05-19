import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CrudService } from 'src/app/servicio/crud.service';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-agregar-empleado',
  templateUrl: './agregar-empleado.component.html',
  styleUrls: ['./agregar-empleado.component.css']
})
export class AgregarEmpleadoComponent implements OnInit {
  public previsualizacion: string | undefined;
  form: FormGroup;
  public archivos: any = [];

  constructor(public formulario: FormBuilder,
    private crudService: CrudService,
    private ruteador: Router, private sanitizer: DomSanitizer, private clienteHttp: HttpClient
  ) {
    this.form = this.formulario.group({
      Nombre: [''],
      Apellido: [''],
      Foto: [''],

    })
  }

  ngOnInit(): void {
  }

  enviarDatos(): any {

    this.SubirArchivo();
    /*const formularioDeDatos = new FormData();
    this.archivos.forEach((archivo: string | Blob) => {
      formularioDeDatos.append('Foto', archivo)
      // console.log('Respuesta del servidor');
      // console.log(formularioDeDatos);
    })


    this.crudService.AgregarEmpleado(this.form.value).subscribe();*/


    Swal.fire({
      title: '',
      text: 'Registro agregado correctamente',
      icon: 'success',
      showConfirmButton: false,
      timer: 1500
    })


    this.ruteador.navigateByUrl('/listar-empleado')
  }


  SubirArchivo(): any   {

    const formularioDeDatos = new FormData();
    console.log(formularioDeDatos);
    this.archivos.forEach((archivo: string | Blob) => {
      formularioDeDatos.append('Foto', archivo)
      formularioDeDatos.append('Nombre', this.form.value.Nombre)
      formularioDeDatos.append('Apellido', this.form.value.Apellido)
      this.clienteHttp.post(this.crudService.API + "upload", formularioDeDatos)
      .subscribe(res=>{
        console.log('respuesta',res);
      })
    })
  }

  CapturarImagen(event: any): any {
    const archivo = event.target.files[0];
    this.archivos.push(archivo);
    this.extraerBase64(archivo).then((imagen: any) => {
      this.previsualizacion = imagen.base;
      console.log(imagen);
    })

    //this.archivos.push(archivo);

  }



  extraerBase64 = async ($event: any) => new Promise((resolve, reject) => {
    try {
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base: reader.result
        });
      };
      reader.onerror = error => {
        resolve({
          base: null
        });
      };
      return null;
    } catch (e) {
      return null;
    }
  })

}

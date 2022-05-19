import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Empleado } from './Empleado';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
API: string="http://localhost:81/api_empleados/public/empleado/";
  constructor( private clienteHttp:HttpClient) { }

  AgregarEmpleado(datosEmpleado:Empleado):Observable<any>{
    return this.clienteHttp.post(this.API+"nuevo",datosEmpleado);
  }

  ObtenerEmpleados(){
    return this.clienteHttp.get(this.API);
  }

  BorrarEmpleados(Id:any):Observable<any>{
    console.log(Id);
    return this.clienteHttp.delete(this.API+"delete/"+Id);
  }

  ObtenerEmpleadoById(Id:any):Observable<any>{
    //console.log(Id);
   return this.clienteHttp.get(this.API+""+Id);
  }

  EditarEmpleadoById(Id:any,datosEmpleado:any):Observable<any>{
    console.log(datosEmpleado);
    return this.clienteHttp.put(this.API+"edit/"+Id,datosEmpleado);
  }
}

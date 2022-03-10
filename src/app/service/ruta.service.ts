import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RutaService {

  constructor(
    private http: HttpClient
  ) { }

  listarDestinos(nombre:String) {
    const path = `http://localhost:8080/api/ruta/destinos/${nombre}`;
    return this.http.get<object[]>(path);
  }

  listarOrigenes() {
    const path = `http://localhost:8080/api/ruta/origenes`;
    return this.http.get<object[]>(path);
  }



}
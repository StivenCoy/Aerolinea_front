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
    const path = `https://aerolinea-bebold-backend.herokuapp.com/api/ruta/destinos/${nombre}`;
    return this.http.get<object[]>(path);
  }
  listarOrigenes() {
    const path = `https://aerolinea-bebold-backend.herokuapp.com/api/ruta/origenes`;
    return this.http.get<object[]>(path);
  }



}
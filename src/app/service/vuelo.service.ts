import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Vuelo } from '../interfaces/vuelo';
import { Vuelos } from '../interfaces/vuelos';
import { DatosVuelo } from '../interfaces/datosVuelo';

@Injectable({
  providedIn: 'root'
})
export class VueloService {
public lVuelos : Object[]=[];
  constructor(
    private http: HttpClient
  ) { }

  listarVuelos(vuelo : DatosVuelo) {
    const path = `https://aerolinea-bebold-backend.herokuapp.com/api/vuelo/lista/`;
    return this.http.post<Vuelos[]>(path, vuelo);
  }
   buscarVuelo(idvuelo:number ) {
    const path = `https://aerolinea-bebold-backend.herokuapp.com/api/vuelo/buscar/${idvuelo}`;
     return this.http.get<Vuelo>(path);
  }

}
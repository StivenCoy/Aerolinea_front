import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pasajero } from '../interfaces/pasajero';

@Injectable({
  providedIn: 'root'
})
export class PasajeroService {

  constructor(
    private http: HttpClient
  ) { }

  crearPasajero(pasajero: Pasajero) {
    const path = `http://localhost:8080/Api/Pasajero/Crear`;
    return this.http.post<Pasajero>(path,pasajero);
  }

  buscarPasajero(idpasajero: number) {
    const path = `http://localhost:8080/Api/Pasajero/Buscar/${idpasajero}`;
    return this.http.get<Pasajero>(path);
  }

  verificarPasajeroFrecuente(idpasajero: number, millas: number) {
    const path = `http://localhost:8080/Api/Pasajero/Crearlocalhost:8080/Api/Pasajero/Viaje?idPasajero=${idpasajero}&millas=${millas}`;
    return this.http.get<String>(path,);
  }

}
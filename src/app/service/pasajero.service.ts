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
    const path = `https://aerolinea-bebold-backend.herokuapp.com/api/pasajero/crear`;
    return this.http.post<Pasajero>(path,pasajero);
  }
  buscarPasajero(idpasajero: String) {
    const path = `https://aerolinea-bebold-backend.herokuapp.com/api/pasajero/buscar/${idpasajero}`;
    return this.http.get<Pasajero>(path);
  }
  verificarPasajeroFrecuente(idpasajero:String, millas:number) {
    const path = `https://aerolinea-bebold-backend.herokuapp.com/api/pasajero/viaje/?idPasajero=${idpasajero}&millas=${millas}`;
    return this.http.get<object[]>(path);
  }

}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tiquete } from '../interfaces/tiquete';
import { Pasajero } from '../interfaces/pasajero';

@Injectable({
  providedIn: 'root'
})
export class TiqueteService {

  constructor(
    private http: HttpClient
  ) { }

  crearTiquete(tiquete: Tiquete) {
    const path = `https://aerolinea-bebold-backend.herokuapp.com/api/tiquete/crear`;
    return this.http.post<Tiquete>(path,tiquete);
  }
  calcularDescuento(pasajero : Pasajero) {
    const path = `https://aerolinea-bebold-backend.herokuapp.com/api/tiquete/descuentos`;
    return this.http.post<number>(path,pasajero);
  }
}
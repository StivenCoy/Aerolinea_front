import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tiquete } from '../interfaces/tiquete';

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
  calcularDescuento(idPasajero : String) {
    const path = `https://aerolinea-bebold-backend.herokuapp.com/api/tiquete/descuentos?idPasajero=${idPasajero}`;
    return this.http.get<number>(path);
  }
}
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
    const path = `http://localhost:8080/Api/Tiquete/Crear`;
    return this.http.post<object[]>(path,tiquete);
  }

  calcularDescuento(fechaInicio : Date, fechaFin : Date, idPasajero : number) {
    const path = `http://localhost:8080/Api/Tiquete/Descuentos?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}&idPasajero=${idPasajero}`;
    return this.http.get<number>(path);
  }
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CiudadService {

  constructor(
    private http: HttpClient
  ) { }

  verificarRequiereVisa(nombre : String) {
    const path = `https://aerolinea-bebold-backend.herokuapp.com/api/ciudad/visa/${nombre}`;
    return this.http.get<boolean>(path);
  }
}
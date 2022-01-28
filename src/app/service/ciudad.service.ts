import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CiudadService {

  constructor(
    private http: HttpClient
  ) { }

  //Metodo que busca si una ciudad requiere de visa
  verificarRequiereVisa(nombre : String) {
    const path = `http://localhost:8080/Api/Ciudad/Visa/${nombre}`;
    return this.http.get<boolean>(path);
  }
}
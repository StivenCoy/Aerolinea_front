import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Reserva } from '../interfaces/reserva';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  constructor(
    private http: HttpClient
  ) { }


  listarReservas() {
    const path = 'http://localhost:8080/Api/Reserva/Listar';
    return this.http.get<object[]>(path);
  }

  listarAtributosReservas() {
    const path = 'http://localhost:8080/Api/Reserva/ListarD';
    return this.http.get<object[]>(path);
  }

  crearReserva(reserva: Reserva) {
    const path = `http://localhost:8080/Api/Reserva/Crear`;
    return this.http.post<object[]>(path,reserva);
  }
}
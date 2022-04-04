import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Reserva } from '../interfaces/reserva';
import { ReservaInfo } from '../interfaces/reservaInfo';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  constructor(
    private http: HttpClient
  ) { }


  listarReservas() {
    const path = 'https://aerolinea-bebold-backend.herokuapp.com/api/reserva/listard';
    return this.http.get<ReservaInfo[]>(path);
  }
  crearReserva(reserva: Reserva) {
    const path = `https://aerolinea-bebold-backend.herokuapp.com/api/reserva/crear`;
    return this.http.post<Reserva>(path,reserva);
  }
}
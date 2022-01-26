import { Pasajero } from "./pasajero";
import { Reserva } from "./reserva";

export interface Tiquete {
    idTiquete:number;
    totalPagar:String;
    pasajero:Pasajero;
    reserva:Reserva
}
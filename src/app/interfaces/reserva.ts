import { Vuelo } from "./vuelo";

export interface Reserva {
    idReserva:number;
    estado:String;
    tipoVuelo:String;
    vueloIda:Vuelo;
    vueloVuelta:Vuelo
}
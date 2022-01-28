import { Ruta } from "./ruta";

export interface Vuelo {
    idVuelo:number;
    fecha:Date;
    isEscala:boolean;
    numero:String;
    hora:String;
    sillasDisponibles:number;
    precio:number;
    ruta:Ruta
}
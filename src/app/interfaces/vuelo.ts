import { Ruta } from "./ruta";

export interface Vuelo {
    idVuelo:number;
    fecha:Date;
    escala:String;
    numero:String;
    hora:String;
    sillasDisponibles:number;
    precio:number;
    ruta:Ruta
}
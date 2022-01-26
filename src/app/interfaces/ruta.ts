import { Ciudad } from "./ciudad";

export interface Ruta {
    idRuta:number;
    duracion:String;
    millas:number;
    ciudadOrigen:Ciudad;
    ciudadDestino:Ciudad
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VueloService {

  constructor(
    private http: HttpClient
  ) { }

  listarVuelos(fecha:Date,origen:String, destino:String,cantidad:number ) {
    const path = `http://localhost:8080/Api/Vuelo/Lista/?fecha=${fecha}&origen=${origen}&destino=${destino}&cantidad=${cantidad}`;
    return this.http.get<object[]>(path);
  }

  //Metodo que busca un vuelo
   buscarVuelo(idvuelo:number ) {
    const path = `http://localhost:8080/Api/Vuelo/Buscar/${idvuelo}`;
     return this.http.get<object[]>(path);
  }

}
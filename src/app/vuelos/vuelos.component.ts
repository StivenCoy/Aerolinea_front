import { Component, OnInit } from '@angular/core';
import { Pasajero } from '../interfaces/pasajero';
import { Vuelo } from '../interfaces/vuelo';
import { Reserva } from '../interfaces/reserva';
import { TiqueteService } from '../service/tiquete.service';
import { CiudadService } from '../service/ciudad.service';
import { PasajeroService } from '../service/pasajero.service';
import { RutaService } from '../service/ruta.service';
import { VueloService } from '../service/vuelo.service';
import { ReservaService } from '../service/reserva.service';
import { Vuelos } from '../interfaces/vuelos';

@Component({
  selector: 'app-vuelos',
  templateUrl: './vuelos.component.html',
  styleUrls: ['./vuelos.component.css']
})
export class VuelosComponent implements OnInit {
  public ciudadesOrigen : Object[] =[] 
  public ciudadesDestino : Object[] =[] 
  public vuelosIda  : Vuelos[] =[] 
  public vuelosRegreso : Vuelos[] = []
  isVisa : boolean=true;
  public vueloIda : boolean = false;
  public vueloIdaRegreso : boolean = false;
  public pasajero!: Pasajero;
  public reserva! : Reserva[];
  public vuelo! : Vuelo;
  public vueloSeleccionadoIda!: Vuelo;
  public vueloSeleccionadoRegreso!: Vuelo;
  public habilitarDatosUsuario : boolean = false;
  pasajeroFrecuente : String=''; 
  ciudadOrigen : string='';
  ciudadDestino : string='';
  fechaIda : Date=new Date;
  fechaRegreso : Date = new Date;
  cantidadAdultos : number = 0;
  cantidadNinos : number = 0;
  cantidadInfantes : number = 0;
  fechaR :Date=new Date;

  //atributos pasajero
  numeroP : number=1;
  pasaporte : number=0;
  nombre : string='';
  apellido : string='';
  telefono : string='';
  correo : string='';
  edad : number=0;
  visa : Date=new Date;

  totalViajeR : number=0;
  totalViajeI : number=0;
  totalViajes : number=0;

   cantidad :number=0;



;
  constructor(
    private ciudadservice : CiudadService,
    private rutaservice : RutaService,
    private vueloservice : VueloService,
    private pasajeroservice : PasajeroService,
    public reservaservice : ReservaService,
    public tiqueteService : TiqueteService,
  
  ) { } 

  ngOnInit(): void {
    this.rutaservice.listarOrigenes().subscribe(result => {
      this.ciudadesOrigen=result;
    });
  }

   listarIda(){ 
        this.rutaservice.listarDestinos(this.ciudadOrigen).subscribe(resultado => {
         this.ciudadesDestino=resultado;
  });
  
}
pedirDatosPasajeros(){
this.habilitarDatosUsuario = true;
}



//verifica si es una ciudad que requiere visa
VerificarCiudadRequiereVisa(){ 
  this.ciudadservice.verificarRequiereVisa(this.ciudadOrigen).subscribe(resultado => {
  this.isVisa=resultado;
});
}

//metodo para buscar un pasajero
buscarPasajero(){ 
  this.pasajeroservice.buscarPasajero(1).subscribe(resultado => {
  this.pasajero=resultado;
});
}

 seleccionarVueloIda(idVuelo : number){
 this.vueloservice.buscarVuelo(idVuelo).subscribe(vuelo =>{
   this.vueloSeleccionadoIda= vuelo;
 });

 if (this.vueloIdaRegreso == true) {
  this.vueloservice.listarVuelos(this.fechaRegreso, this.ciudadDestino, this.ciudadOrigen,this.cantidadAdultos + this.cantidadNinos).subscribe(res => {
    this.vuelosRegreso=res;
  });
}
else{
  this.totalViajes = (this.cantidadAdultos+this.cantidadInfantes+this.cantidadNinos) * this.vueloSeleccionadoIda.precio;
  console.log(this.vueloSeleccionadoIda.precio, 'precio', this.cantidadAdultos + this.cantidadInfantes + this.cantidadNinos)
}
}

seleccionarVueloRegreso(idVuelo : number){
  this.vueloservice.buscarVuelo(idVuelo).subscribe(vuelo =>{
    this.vueloSeleccionadoRegreso= vuelo;
  });

  this.totalViajes = (this.cantidadAdultos+this.cantidadInfantes+this.cantidadNinos) * this.vueloSeleccionadoIda.precio +
  (this.cantidadAdultos+this.cantidadInfantes+this.cantidadNinos) * this.vueloSeleccionadoRegreso.precio ;
}


SeleccionarVueloIda(){
this.vueloIda=true;
this.vueloIdaRegreso=false;


}
SeleccionarVueloIdaRegreso(){
  this.vueloIda=false;
  this.vueloIdaRegreso= true;

  }

//NO me sirve
verificarPasajeroFrecuente(){ 
  this.pasajeroservice.verificarPasajeroFrecuente(1,40).subscribe(resultado => {
  this.pasajeroFrecuente=resultado;
});
} 

listarReservas(){ 
  this.reservaservice.listarReservas().subscribe(resultado => {
  this.reserva=resultado;
});
} 

//no sirve
// listarAtributosReservas(){ 
//   this.reservaservice.listarAtributosReservas.subscribe(resultado => {
//   this.reserva=resultado;
// });
// } 

// no sirve
// calcularDescuento(){ 
//   this.tiqueteService.calcularDescuento('01-01-2022,').subscribe(resultado => {
//   this.reserva=resultado;
// });
// }

// listarIda(){ 
//   this.vueloservice.buscarVuelo(1).subscribe(resultado => {
//   this.vuelo=resultado;
// });
// }

// listarIda(){ 
//   this.reservaservice.listarReservas().subscribe(resultado => {
//   this.reserva=resultado;
// });
// }

 async listarVuelos(){ 
 await  this.vueloservice.listarVuelos(this.fechaIda, this.ciudadOrigen, this.ciudadDestino,this.cantidadAdultos + this.cantidadNinos).subscribe(res => {
    this.vuelosIda=res;
  });
}

// listarVuelosRegreso(){ 
//   this.vueloservice.listarVuelos(this.fechaRegreso, this.ciudadDestino, this.ciudadOrigen,this.cantidadAdultos + this.cantidadNinos).subscribe(res => {
//    this.lVuelos=res;
//  });
// }
} 

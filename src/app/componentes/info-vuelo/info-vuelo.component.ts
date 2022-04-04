import { Component, Input, OnInit, Output } from '@angular/core';
import { Pasajero } from 'src/app/interfaces/pasajero';
import { Vuelo } from 'src/app/interfaces/vuelo';
import { TiqueteService } from 'src/app/service/tiquete.service';
import { CiudadService } from 'src/app/service/ciudad.service';
import { RutaService } from 'src/app/service/ruta.service';
import { VueloService } from 'src/app/service/vuelo.service';
import { ReservaService } from 'src/app/service/reserva.service';
import { Vuelos } from 'src/app/interfaces/vuelos';
import { info_pasajero } from 'src/app/interfaces/info_pasajero';
import { ReservaInfo } from 'src/app/interfaces/reservaInfo';
import { DatosVuelo } from 'src/app/interfaces/datosVuelo';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-info-vuelo',
  templateUrl: './info-vuelo.component.html',
  styleUrls: ['./info-vuelo.component.css']
})
export class InfoVueloComponent implements OnInit {

  ciudadesOrigen : Object[] =[] 
   ciudadesDestino : Object[] =[] 
   @Output() VuelosIda: EventEmitter<any> = new EventEmitter();
   vuelosIda  : Vuelos[] =[] 
   vuelosRegreso : Vuelos[] = []
   listReserva : ReservaInfo[];
   listPasajeros : Pasajero[]= [];
   datosPasajeros : info_pasajero[] = []
   @Output() VueloRegreso: EventEmitter<any> = new EventEmitter();
   vueloRegreso : DatosVuelo | null ;
   @Output() CantidadPersonas: EventEmitter<any> = new EventEmitter();

   habilitarDatosUsuario : boolean = false;
   vueloIda : boolean = false;
   @Output() VueloIdaRegreso: EventEmitter<any> = new EventEmitter();
   vueloIdaRegreso : boolean = false;
   habilitarDescuentos : boolean = false;
   habilitarReservas : boolean = false;
   vueloSeleccionadoIda: Vuelo| null;
   vueloSeleccionadoRegreso: Vuelo| null;
   habilitarCampos : boolean = false;
   @Output() HabilitarCampos: EventEmitter<any> = new EventEmitter();
   @Output() CiudadOrigen: EventEmitter<any> = new EventEmitter();
  ciudadOrigen : string='';
  ciudadDestino : string='';
  tipoVuelo : string;
  fechaIda : Date=new Date;
  fechaRegreso : Date = new Date;
  cantidadAdultos : number = 0;
  cantidadNinos : number = 0;
  cantidadInfantes : number = 0;
  requiereVisa : boolean = false;

  cantidadMillasViaje : number =0;

  precioTotalViajes : number =0;
  totalPjsRegistrados : number = 0; 
  totalViajeros : number =0;

  constructor(
    private ciudadservice : CiudadService,
    private rutaservice : RutaService,
    private vueloservice : VueloService,
    public reservaservice : ReservaService,
    public tiqueteService : TiqueteService,
  ) { }
  ngOnInit(): void {
    this.rutaservice.listarOrigenes().subscribe(result => {
      this.ciudadesOrigen=result;
    });
  }
  habilitarTablaDescuentos(habilitarDescuentos : boolean):void {
    this.habilitarDescuentos = habilitarDescuentos;
  }
  habilitarTablaReservas(habilitarReserva : boolean):void {
    this.habilitarReservas = habilitarReserva;
    this.vaciarCamposInfoPasajero();
  }
  listarDescuentos(descuentos :info_pasajero[]){
    this.datosPasajeros=descuentos;
  }

  //limpiar datos del formulario de pasajero
vaciarCamposInfoPasajero(){
  let vuelo : Vuelo ;
  this.listPasajeros = [];
  this.datosPasajeros = []
  this.vueloRegreso = null ;
  this.habilitarDatosUsuario = false;
  this.vueloIda = false;
  this.vueloIdaRegreso = false;
  this.habilitarDescuentos  = false;
 // habilitarReservas : boolean = false;
 this.vueloSeleccionadoIda = null;
 this.vueloSeleccionadoRegreso= null;
 this.habilitarCampos= false;
 this.ciudadOrigen ='';
 this.ciudadDestino ='';
 this.tipoVuelo ='';
 this.fechaIda =new Date;
 this.fechaRegreso = new Date;
 this.cantidadAdultos = 0;
 this.cantidadNinos = 0;
 this.cantidadInfantes = 0;
 this.requiereVisa  = false;
 this.cantidadMillasViaje  =0;
 this.precioTotalViajes  =0;
 this.totalPjsRegistrados  = 0; 
 this.totalViajeros  =0;
}

  //lista las ciudades desde donde se vuela
   listarIda(){ 
        this.rutaservice.listarDestinos(this.ciudadOrigen).subscribe(resultado => {
         this.ciudadesDestino=resultado; 
         this.CiudadOrigen.emit({data : this.ciudadOrigen})
  });
}
  // habilita la info de pasajero
  pedirDatosPasajeros(vuelos : Vuelo[]){
    if((this.vueloIdaRegreso == true && vuelos.length == 2) || (this.vueloIdaRegreso == false)){
    this.vueloSeleccionadoIda = vuelos[0];
    this.vueloSeleccionadoRegreso = vuelos[1];
    this.habilitarDatosUsuario = true;
    this.calcularCantidadMillasAViajar();
    }
  }

  //calcula la cantidad de millas a viajar dependiendo si es vuela ida y regreso o solo ida
  calcularCantidadMillasAViajar(){
    if(this.vueloIdaRegreso && this.vueloSeleccionadoIda !=null && this.vueloSeleccionadoRegreso != null){
      this.cantidadMillasViaje = (Number)(this.vueloSeleccionadoIda.ruta.millas) + (Number)(this.vueloSeleccionadoRegreso.ruta.millas)
    }
    else if(this.vueloSeleccionadoIda !=null) {
      this.cantidadMillasViaje = (Number)(this.vueloSeleccionadoIda.ruta.millas) ;
    }
  }

  //verifica si una ciudad requiere visa 
  verificarCiudadRequiereVisa(){
    this.ciudadservice.verificarRequiereVisa(this.ciudadDestino).subscribe(isVisa => {
      this.requiereVisa = isVisa;
    });
  }

  //seleccioana tipo de vuelo solo ida
  SeleccionarTipoVueloIda(){
  this.vueloIda=true;
  this.vueloIdaRegreso=false;
  }
  // selecciona tipo de vuelo ida y regreso 
  SeleccionarTipoVueloIdaRegreso(){
    this.vueloIda=false;
    this.vueloIdaRegreso= true;
    }

  //listar los vuelos con los filtros  
   listarVuelos(){ 
    this.totalViajeros = (Number(this.cantidadAdultos) + Number(this.cantidadInfantes) + Number(this.cantidadNinos));
    let vuelo : DatosVuelo = {
    origen:this.ciudadOrigen,
    destino:this.ciudadDestino,
    fecha:this.fechaIda,
    cantidad:this.totalViajeros,
    }
    if(this.vueloIdaRegreso == true){
       this.vueloRegreso = {
        origen:this.ciudadDestino,
        destino:this.ciudadOrigen,
        fecha:this.fechaRegreso,
        cantidad:this.totalViajeros,
        }
    }
    this.vueloservice.listarVuelos(vuelo).subscribe(res => {
      this.vuelosIda = res;
      this.verificarCiudadRequiereVisa();
      this.habilitarCampos = true;
      this.precioTotalViajes = (Number(this.cantidadAdultos) + Number(this.cantidadInfantes) + Number(this.cantidadNinos));
    });
  }
} 
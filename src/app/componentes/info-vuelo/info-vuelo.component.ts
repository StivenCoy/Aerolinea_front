import { Component, Input, OnInit, Output } from '@angular/core';
import { Pasajero } from 'src/app/interfaces/pasajero';
import { Vuelo } from 'src/app/interfaces/vuelo';
import { Reserva } from 'src/app/interfaces/reserva';
import { TiqueteService } from 'src/app/service/tiquete.service';
import { CiudadService } from 'src/app/service/ciudad.service';
import { PasajeroService } from 'src/app/service/pasajero.service';
import { RutaService } from 'src/app/service/ruta.service';
import { VueloService } from 'src/app/service/vuelo.service';
import { ReservaService } from 'src/app/service/reserva.service';
import { Vuelos } from 'src/app/interfaces/vuelos';
import { info_pasajero } from 'src/app/interfaces/info_pasajero';
import { Tiquete } from 'src/app/interfaces/tiquete';
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
   listReserva! : ReservaInfo[];
   listPasajeros : Pasajero[]= [];
   tiposPjs : String[] = ["Adulto","Niño", "Infante"]; 
   datosPasajeros : info_pasajero[] = []
   @Output() VueloRegreso: EventEmitter<any> = new EventEmitter();
   vueloRegreso! : DatosVuelo ;
   @Output() CantidadPersonas: EventEmitter<any> = new EventEmitter();

   habilitarDatosUsuario : boolean = false;
   vueloIda : boolean = false;
   @Output() VueloIdaRegreso: EventEmitter<any> = new EventEmitter();
   vueloIdaRegreso : boolean = false;
   habilitarDescuentos : boolean = false;
   habilitarReservas : boolean = false;
   vueloSeleccionadoIda: Vuelo;
   vueloSeleccionadoRegreso!: Vuelo;
   @Output() HabilitarCampos: EventEmitter<any> = new EventEmitter();
   @Output() CiudadOrigen: EventEmitter<any> = new EventEmitter();
  ciudadOrigen : string='';
  ciudadDestino : string='';
  fechaIda : Date=new Date;
  fechaRegreso : Date = new Date;
  cantidadAdultos : number = 0;
  cantidadNinos : number = 0;
  cantidadInfantes : number = 0;
  requiereVisa : boolean = false;

  cantidadMillasViaje : number =0;

  //atributos pasajero
  numeroP : number=1;
  pasaporte : number=0;
  nombre : String='';
  apellido : String='';
  telefono : String='';
  correo : String='';
  edad : number=0;
  visa : Date=new Date;
  cedula : String = '';
  tipoViajero : String = '';
  infoIsFrecuente : String=''; 

  precioTotalViajes : number =0;
  totalPjsRegistrados : number = 0; 
  totalViajeros : number =0;

  constructor(
    private ciudadservice : CiudadService,
    private rutaservice : RutaService,
    private vueloservice : VueloService,
    private pasajeroservice : PasajeroService,
    public reservaservice : ReservaService,
    public tiqueteService : TiqueteService,
    //private detalleVuelos : DetalleVuelosComponent
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
  }

  listarDescuentos(descuentos :info_pasajero[]){
    this.datosPasajeros=descuentos;
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
  //metodo para buscar un pasajero
  buscarPasajero(){ 
    let pasajero : Pasajero;
      this.pasajeroservice.buscarPasajero(this.cedula).subscribe(resultado => {
        if(resultado != null){
          pasajero=resultado;
          this.nombre=pasajero.nombre;
          this.apellido = pasajero.apellido;
          this.telefono = pasajero.telefono;
          this.correo = pasajero.correo;
          this.edad = pasajero.edad;
          this.visa = pasajero.fecha;
          this.tipoViajero =pasajero.tipoViajero;
          this.listPasajeros.push(pasajero);
          this.totalPjsRegistrados += 1;
          this.verificarCantidadPasajerosRegistrados();
          this.vaciarCamposInfoPasajero();
        }
  });
  }
//metodo para crear un pasajero en el front
registrarPasajero(){ 
 let pasajero : Pasajero = {
    idPasajero:-1,
    nombre:this.nombre,
    apellido:this.apellido,
    telefono:this.telefono,
    correo:this.correo,
    edad:this.edad,
    fecha:this.visa,
    cantidadViajes:0,
    millasViajadas:0,
    tipoViajero: this.tipoViajero,
    isFrecuente:false,
    cedula: this.cedula,
}
this.listPasajeros.push(pasajero);
this.totalPjsRegistrados += 1;
this.verificarCantidadPasajerosRegistrados();
this.vaciarCamposInfoPasajero();
}
//verificar cantidad de pasajeros registrados
verificarCantidadPasajerosRegistrados(){
  if(this.totalPjsRegistrados == this.totalViajeros){
    this.habilitarDatosUsuario = false;
    this.habilitarDescuentos = true;
    this.verificarReglasDeNegocio();
  }
}
//limpiar datos del formulario de pasajero
vaciarCamposInfoPasajero(){
  this.numeroP =1;
  this.pasaporte =0;
  this.nombre ='';
  this.apellido ='';
  this.telefono ='';
  this.correo ='';
  this.edad =0;
  this.visa =new Date;
  this.cedula  = '';
}
//guarda los pasajeros en la base de datos
crearPasajerosYTiquetes(reserva : Reserva){
  for (let i = 0; i < this.listPasajeros.length; i++) {
      this.pasajeroservice.crearPasajero(this.listPasajeros[i]).subscribe(pasajero =>{
        if(this.vueloIdaRegreso == true){
          this.crearTiquete(pasajero,reserva, this.datosPasajeros[i].precioRegreso);
        }
        console.log(this.datosPasajeros.length);
        this.crearTiquete(pasajero,reserva, this.datosPasajeros[i].precioIda);
      });
  }
}

vaciarInfo(){
  this.ciudadesOrigen  =[] 
  this.ciudadesDestino  =[] 
  this. vuelosIda   =[] 
  this.vuelosRegreso  = []
  this.listReserva!=[];
  this.listPasajeros = [];
  this.datosPasajeros = [];
  this.vueloIda  = false;
  this.vueloIdaRegreso  = false;
  this.vueloSeleccionadoIda;
  this.vueloSeleccionadoRegreso;


  this.ciudadOrigen ='';
  this.ciudadDestino ='';
  this.fechaIda=new Date;
  this.fechaRegreso  = new Date;
  this.cantidadAdultos  = 0;
  this.cantidadNinos  = 0;
  this.cantidadInfantes  = 0;
  this.requiereVisa  = false;

  this.cantidadMillasViaje =0;

  this.precioTotalViajes  =0;
  this.totalPjsRegistrados  = 0; 
  this.totalViajeros  =0;
}
//selecciona un vuelo de ida
  seleccionarVueloIda(idVuelo : number){
  this.vueloservice.buscarVuelo(idVuelo).subscribe(vuelo =>{
    this.vueloSeleccionadoIda= vuelo;
    if (this.vueloIdaRegreso == true) {
      let vuelo : DatosVuelo = {
        origen:this.ciudadDestino,
        destino:this.ciudadOrigen,
        fecha:this.fechaRegreso,
        cantidad:this.totalViajeros,
        }
      this.vueloservice.listarVuelos(vuelo).subscribe(res => {
        this.vuelosRegreso=res;
      });
    }
      this.precioTotalViajes = (Number(this.cantidadAdultos) + Number(this.cantidadInfantes) + Number(this.cantidadNinos)) * this.vueloSeleccionadoIda.precio;
  });
  this.verificarCiudadRequiereVisa();
  }
  //verifica si una ciudad requiere visa 
  verificarCiudadRequiereVisa(){
    this.ciudadservice.verificarRequiereVisa(this.ciudadDestino).subscribe(isVisa => {
      this.requiereVisa = isVisa;
    });
  }
  //seleccionar vuelo de regreso 
  seleccionarVueloRegreso(idVuelo : number){
    this.vueloservice.buscarVuelo(idVuelo).subscribe(vuelo =>{
      this.vueloSeleccionadoRegreso= vuelo;
      this.precioTotalViajes = Number(this.precioTotalViajes) + ((Number(this.cantidadAdultos) + Number(this.cantidadInfantes) + Number(this.cantidadNinos)) * (this.vueloSeleccionadoRegreso.precio)) ;  
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
  //calcula la cantidad de millas a viajar dependiendo si es vuela ida y regreso o solo ida
  calcularCantidadMillasAViajar(){
    if(this.vueloIdaRegreso){
      this.cantidadMillasViaje = (Number)(this.vueloSeleccionadoIda.ruta.millas) + (Number)(this.vueloSeleccionadoRegreso.ruta.millas)
    }
    else {
      this.cantidadMillasViaje = (Number)(this.vueloSeleccionadoIda.ruta.millas) ;
    }
  }
  //lista las reservas existentes
  listarReservas(){ 
    this.reservaservice.listarReservas().subscribe(resultado => {
      this.habilitarReservas = true;
    this.listReserva=resultado;
  });
  } 
  //crea reservas
  crearReserva(){
  let tipoVuelo  ='';
  if(this.vueloIdaRegreso){
    tipoVuelo='RT';
  }
  else{
    tipoVuelo='OW';
  }
    let reserva : Reserva={
      idReserva: -1,
      estado: 'Proceso',
      tipoVuelo:tipoVuelo,
      vueloIda:this.vueloSeleccionadoIda,
      vueloVuelta:this.vueloSeleccionadoRegreso
    }
    this.reservaservice.crearReserva(reserva).subscribe(reserva => {
      reserva=reserva;
      this.crearPasajerosYTiquetes(reserva);
    });
  }
//corregir el precio de cada tiquete
crearTiquete(pasajero:Pasajero, reserva: Reserva, precio : number){
let tiquete : Tiquete = {
  idTiquete:-1,
  totalPagar:''+precio,
  pasajero:pasajero,
  reserva:reserva,
}
this.tiqueteService.crearTiquete(tiquete).subscribe(tiquete => {
  console.log(tiquete, "tiquete creado");});
}
//comprar viaje
comprarViaje(){
  this.crearReserva();
  console.log('su compra se realizo correctamente');
  //this.listReserva;
}
//verifica si un viajero es frecuente
verificarPasajeroFrecuente(cedula : String, descuento : number,nombre:String){ 
    this.pasajeroservice.verificarPasajeroFrecuente(cedula, this.cantidadMillasViaje).subscribe(resultado => { 
      this.infoIsFrecuente= '' +resultado[0];
      this.crearInfoPasajero(descuento,cedula,nombre);
      console.log(this.datosPasajeros)
    });
} 
 //calcula el descuento de un pasajero
 calcularDescuento(cedula : String, nombre : String) { 
   let descuento: number;
  this.tiqueteService.calcularDescuento(cedula).subscribe(desc => {
  descuento = desc;
  this.verificarPasajeroFrecuente(cedula,descuento,nombre);
});
}
//Verifica todas las reglas de negocio
  verificarReglasDeNegocio(){
    let descuentoPasajero : number =0;
    let frecuente : String = '';
    for (let i = 0; i < this.listPasajeros.length; i++) {
     this.calcularDescuento(this.listPasajeros[i].cedula,this.listPasajeros[i].nombre);
  } 
  }
  //Crear informacion de cada pasajero 
  crearInfoPasajero(descuento : number,cedula:String, nombre:String){
    let infoPasajero :info_pasajero;
    if(this.vueloIdaRegreso == true){
    infoPasajero = {
      nombre : nombre,
      cedula : cedula,
      frecuente : this.infoIsFrecuente,
      descuento : descuento,
      precioIda : ((-descuento + 100) * this.vueloSeleccionadoIda.precio) / 100,
      precioRegreso : ((-descuento + 100) * this.vueloSeleccionadoRegreso.precio) / 100
    }}
    else{
    infoPasajero = {
      nombre : nombre,
      cedula : cedula,
      frecuente : this.infoIsFrecuente,
      descuento : descuento,
      precioIda : ((-descuento + 100) * this.vueloSeleccionadoIda.precio) / 100,
      precioRegreso : 0
  }}
    this.datosPasajeros.push(infoPasajero);
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
      console.log(this.vuelosIda, 'vuelos')
      this.precioTotalViajes = (Number(this.cantidadAdultos) + Number(this.cantidadInfantes) + Number(this.cantidadNinos));
      // this.VuelosIda.emit({data : this.vuelosIda})
      // this.VueloRegreso.emit({data : this.vueloRegreso})
      // this.VueloIdaRegreso.emit({data : this.vueloIdaRegreso})
      // this.HabilitarCampos.emit({data : true})
      // this.CantidadPersonas.emit({data : this.precioTotalViajes})
    });
  }

  cargarDatos(){ 
      // this.infoVuelo.VuelosIda.subscribe(result => {
      //   this.vuelosIda=result.data
      // })
    }

} 
import { Component, OnInit, Input, Output } from '@angular/core';
import { Pasajero } from 'src/app/interfaces/pasajero';
import { Vuelo } from 'src/app/interfaces/vuelo';
import { Reserva } from 'src/app/interfaces/reserva';
import { TiqueteService } from 'src/app/service/tiquete.service';
import { CiudadService } from 'src/app/service/ciudad.service';
import { PasajeroService } from 'src/app/service/pasajero.service';
import { ReservaService } from 'src/app/service/reserva.service';
import { info_pasajero } from 'src/app/interfaces/info_pasajero';
import { Tiquete } from 'src/app/interfaces/tiquete';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-info-pasajero',
  templateUrl: './info-pasajero.component.html',
  styleUrls: ['./info-pasajero.component.css']
})
export class InfoPasajeroComponent implements OnInit {

  ciudadesOrigen : Object[] =[] 
  @Output() listaPasajeros = new EventEmitter<Pasajero[]>() ;
   listPasajeros : Pasajero[]= [];
   tiposPjs : String[] = ["Adulto","Niño", "Infante"]; 
   datosPasajeros : info_pasajero[] = []
   @Output() DatosPasajeros = new EventEmitter<info_pasajero[]>() ;
   @Input() habilitarDatosUsuario : boolean;
   habilitarCampos : boolean = false; 
   vueloIda : boolean = false;
   @Input()vueloIdaRegreso : boolean = false;
   @Output() HabilitarDescuentos = new EventEmitter<boolean>() ;
   continuarInfoPasajero : boolean = false;
   @Input() vueloSeleccionadoIda: Vuelo | null;
   @Input() vueloSeleccionadoRegreso: Vuelo | null ;

  ciudadDestino : string='';
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
  totalPjsRegistrados : number = 0; 
  @Input() totalViajeros : number =0;

  constructor(
    private ciudadservice : CiudadService,
    private pasajeroservice : PasajeroService,
    public reservaservice : ReservaService,
    public tiqueteService : TiqueteService,
  ) { }

 
  ngOnInit(): void {
  }
 
  // habilita la info de pasajero
  pedirDatosPasajeros(){
    this.habilitarCampos = true;
    this.calcularCantidadMillasAViajar();
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
console.log('cantidad pasajeros', this.listPasajeros)
}
//verificar cantidad de pasajeros registrados
verificarCantidadPasajerosRegistrados(){
  if(this.totalPjsRegistrados == this.totalViajeros){
    this.DatosPasajeros.emit( this.datosPasajeros)
    this.HabilitarDescuentos.emit(true);
    this.listaPasajeros.emit(this.listPasajeros);
    this.habilitarDatosUsuario = false;
    this.habilitarCampos = false;
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
  //verifica si una ciudad requiere visa 
  verificarCiudadRequiereVisa(){
    this.ciudadservice.verificarRequiereVisa(this.ciudadDestino).subscribe(isVisa => {
      this.requiereVisa = isVisa;
    });
  }


  //calcula la cantidad de millas a viajar dependiendo si es vuela ida y regreso o solo ida
  calcularCantidadMillasAViajar(){
    if(this.vueloIdaRegreso && this.vueloSeleccionadoIda != null && this.vueloSeleccionadoRegreso != null){
      this.cantidadMillasViaje = (Number)(this.vueloSeleccionadoIda.ruta.millas) + (Number)(this.vueloSeleccionadoRegreso.ruta.millas)
    }
    else if(this.vueloSeleccionadoIda != null){
      this.cantidadMillasViaje = (Number)(this.vueloSeleccionadoIda.ruta.millas) ;
    }
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
    if(this.vueloIdaRegreso == true && this.vueloSeleccionadoIda != null && this.vueloSeleccionadoRegreso != null){
    infoPasajero = {
      nombre : nombre,
      cedula : cedula,
      frecuente : this.infoIsFrecuente,
      descuento : descuento,
      precioIda : ((-descuento + 100) * this.vueloSeleccionadoIda.precio) / 100,
      precioRegreso : ((-descuento + 100) * this.vueloSeleccionadoRegreso.precio) / 100
    }
    this.datosPasajeros.push(infoPasajero);
  }
    else if(this.vueloSeleccionadoIda != null){
    infoPasajero = {
      nombre : nombre,
      cedula : cedula,
      frecuente : this.infoIsFrecuente,
      descuento : descuento,
      precioIda : ((-descuento + 100) * this.vueloSeleccionadoIda.precio) / 100,
      precioRegreso : 0
  } 
  this.datosPasajeros.push(infoPasajero);
}
    
  }
} 


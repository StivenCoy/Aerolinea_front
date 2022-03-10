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
import { info_pasajero } from '../interfaces/info_pasajero';
import { Tiquete } from '../interfaces/tiquete';
import { ReservaInfo } from '../interfaces/reservaInfo';

@Component({
  selector: 'app-vuelos',
  templateUrl: './vuelos.component.html',
  styleUrls: ['./vuelos.component.css']
})
export class VuelosComponent implements OnInit {
   ciudadesOrigen : Object[] =[] 
   ciudadesDestino : Object[] =[] 
   vuelosIda  : Vuelos[] =[] 
   vuelosRegreso : Vuelos[] = []
   listReserva! : ReservaInfo[];
   listPasajeros : Pasajero[]= [];
   tiposPjs : String[] = ["Adulto","Niño", "Infante"]; 
   datosPasajeros : info_pasajero[] = []

   habilitarDatosUsuario : boolean = false;
   vueloIda : boolean = false;
   vueloIdaRegreso : boolean = false;
   vueloSeleccionadoIda!: Vuelo;
   vueloSeleccionadoRegreso!: Vuelo;


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
  ) { } 


  ngOnInit(): void {
    this.rutaservice.listarOrigenes().subscribe(result => {
      this.ciudadesOrigen=result;
    });
  }
  //lista las ciudades desde donde se vuela
   listarIda(){ 
        this.rutaservice.listarDestinos(this.ciudadOrigen).subscribe(resultado => {
         this.ciudadesDestino=resultado; 
         this.listarReservas();
  });
}
  // habilita la info de pasajero
  pedirDatosPasajeros(){
    this.habilitarDatosUsuario = true;
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
}
//verificar cantidad de pasajeros registrados
verificarCantidadPasajerosRegistrados(){
  if(this.totalPjsRegistrados == this.totalViajeros){
    this.habilitarDatosUsuario = false;
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
        this.crearTiquete(pasajero,reserva, this.datosPasajeros[i].precio);
      });
  }
}
//selecciona un vuelo de ida
  seleccionarVueloIda(idVuelo : number){
  this.vueloservice.buscarVuelo(idVuelo).subscribe(vuelo =>{
    this.vueloSeleccionadoIda= vuelo;
    if (this.vueloIdaRegreso == true) {
      this.vueloservice.listarVuelos(this.fechaRegreso, this.ciudadDestino, this.ciudadOrigen,Number(this.cantidadAdultos) + Number(this.cantidadNinos) + Number(this.cantidadInfantes)).subscribe(res => {
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
verificarPasajeroFrecuente(cedula : String, descuento : number){ 
    this.pasajeroservice.verificarPasajeroFrecuente(cedula, this.cantidadMillasViaje).subscribe(resultado => { 
      this.infoIsFrecuente= '' +resultado[0];
      this.crearInfoPasajero(descuento);
    });
} 
 //calcula el descuento de un pasajero
 calcularDescuento(cedula : String) { 
   let descuento: number;
  this.tiqueteService.calcularDescuento(cedula).subscribe(desc => {
  descuento = desc;
  this.verificarPasajeroFrecuente(cedula,descuento);
});
}
//Verifica todas las reglas de negocio
  verificarReglasDeNegocio(){
    let descuentoPasajero : number =0;
    let frecuente : String = '';
    for (let i = 0; i < this.listPasajeros.length; i++) {
     this.calcularDescuento(this.listPasajeros[i].cedula);
  } 
  }
  //Crear informacion de cada pasajero 
  crearInfoPasajero(descuento : number){
    let infoPasajero :info_pasajero = {
      frecuente : this.infoIsFrecuente,
      descuento : descuento,
      precio : ((-descuento + 100) * this.precioTotalViajes) / 100
    }
    this.datosPasajeros.push(infoPasajero);
  }
  //listar los vuelos con los filtros  
  async listarVuelos(){ 
  await  this.vueloservice.listarVuelos(this.fechaIda, this.ciudadOrigen, this.ciudadDestino,(Number(this.cantidadAdultos) + Number(this.cantidadNinos))).subscribe(res => {
      this.vuelosIda=res;
      this.totalViajeros = (Number(this.cantidadAdultos) + Number(this.cantidadInfantes) + Number(this.cantidadNinos));
    });
  }
} 

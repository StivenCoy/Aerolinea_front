import { Component, Input, OnInit, Output } from '@angular/core';
import { Vuelo } from 'src/app/interfaces/vuelo';
import { TiqueteService } from 'src/app/service/tiquete.service';
import { VueloService } from 'src/app/service/vuelo.service';
import { ReservaService } from 'src/app/service/reserva.service';
import { Vuelos } from 'src/app/interfaces/vuelos';
import { DatosVuelo } from 'src/app/interfaces/datosVuelo';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-detalle-vuelos',
  templateUrl: './detalle-vuelos.component.html',
  styleUrls: ['./detalle-vuelos.component.css']
})
export class DetalleVuelosComponent implements OnInit {

   @Input() vuelosIda  : Vuelos[];
   @Input() vuelosRegreso : Vuelos[];
   vuelosSeleccionado : Vuelo[] = [];
   @Output() VueloSeleccionadoIda = new EventEmitter<Vuelo[]>() ;
   vueloSeleccionadoIda: Vuelo;
   @Output() VueloSeleccionadoRegreso: EventEmitter<any> = new EventEmitter();
   vueloSeleccionadoRegreso: Vuelo;
   @Input()  vueloRegreso : DatosVuelo ;
   habilitarVuelta : boolean = false;
   @Input()  cantidadPersonas : number = 0 ;
   vueloIda : boolean = false;
   @Input()  vueloIdaRegreso : boolean = false;
   @Input() habilitarCampos : boolean;
   requiereVisa : boolean = false;

  cantidadMillasViaje : number =0;
  precioTotalViajes : number =0;
  totalPjsRegistrados : number = 0; 
  totalViajeros : number =0;

  constructor(
    private vueloservice : VueloService,
    public reservaservice : ReservaService,
    public tiqueteService : TiqueteService,
  ) { }
 
  ngOnInit(): void {
   // this.cargarDatos();
  }

vaciarInfo(){
  this. vuelosIda   =[] 
  this.vuelosRegreso  = []
  this.vueloIda  = false;
  this.vueloIdaRegreso  = false;
  this.vueloSeleccionadoIda;
  this.vueloSeleccionadoRegreso;
  this.requiereVisa  = false;
  this.cantidadMillasViaje =0;
  this.precioTotalViajes  =0;
  this.totalPjsRegistrados  = 0; 
  this.totalViajeros  =0;
}
//selecciona un vuelo de ida
  seleccionarVueloIda(idVuelo : number){
  this.vueloservice.buscarVuelo(idVuelo).subscribe(vuelo =>{
    if(this.vueloSeleccionadoIda != undefined && this.vueloIdaRegreso == true) {
      this.vueloSeleccionadoRegreso = vuelo
      this.habilitarCampos= false;
      this.vuelosSeleccionado.push(this.vueloSeleccionadoRegreso);
    }
    if(this.vueloSeleccionadoIda == undefined){
      this.vueloSeleccionadoIda= vuelo;
      this.vuelosSeleccionado.push(this.vueloSeleccionadoIda);
    }
    if(this.vueloIdaRegreso == true){

      this.vueloservice.listarVuelos(this.vueloRegreso).subscribe(res => {
        this.vuelosIda=res;
      });
    }
    
    else {
      this.habilitarCampos= false;
    }
    this.precioTotalViajes =  Number(this.cantidadPersonas) * this.vueloSeleccionadoIda.precio;
    this.VueloSeleccionadoIda.emit( this.vuelosSeleccionado)
    this.VueloSeleccionadoRegreso.emit({data : this.vueloSeleccionadoRegreso})
  });
  //this.verificarCiudadRequiereVisa();
  }
  
  //seleccionar vuelo de regreso 
  seleccionarVueloRegreso(idVuelo : number){
    this.vueloservice.buscarVuelo(idVuelo).subscribe(vuelo =>{
      this.vueloSeleccionadoRegreso= vuelo;
      this.precioTotalViajes = Number(this.cantidadPersonas) * (this.vueloSeleccionadoRegreso.precio) ;  
    });
  }
} 

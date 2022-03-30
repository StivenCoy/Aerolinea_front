import { Component, OnInit, Input , Output} from '@angular/core';
import { Pasajero } from 'src/app/interfaces/pasajero';
import { Vuelo } from 'src/app/interfaces/vuelo';
import { TiqueteService } from 'src/app/service/tiquete.service';
import { ReservaService } from 'src/app/service/reserva.service';
import { info_pasajero } from 'src/app/interfaces/info_pasajero';
import { Reserva } from 'src/app/interfaces/reserva';
import { PasajeroService } from 'src/app/service/pasajero.service';
import { Tiquete } from 'src/app/interfaces/tiquete';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-detalle-descuentos',
  templateUrl: './detalle-descuentos.component.html',
  styleUrls: ['./detalle-descuentos.component.css']
})
export class DetalleDescuentosComponent implements OnInit {

   listPasajeros : Pasajero[]= [];
   @Input() datosPasajeros : info_pasajero[] ;

   vueloIda : boolean = false;
   vueloIdaRegreso : boolean = false;
   @Input()habilitarDescuentos : boolean;
   @Output() HabilitarReservas = new EventEmitter<boolean>() ;
   vueloSeleccionadoIda!: Vuelo;
   vueloSeleccionadoRegreso!: Vuelo;

  constructor(
    public reservaservice : ReservaService,
    public tiqueteService : TiqueteService,
    private pasajeroservice : PasajeroService,
  ) { }

 
  ngOnInit(): void {
  }

  comprarViaje(){
    this.crearReserva();
    console.log('su compra se realizo correctamente');
    this.HabilitarReservas.emit(true);
    //this.listReserva;
  }

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

} 
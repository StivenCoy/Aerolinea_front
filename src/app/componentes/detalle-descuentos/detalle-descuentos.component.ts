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

   @Input() listPasajeros : Pasajero[];
   @Input() datosPasajeros : info_pasajero[];

   @Input() vueloIda : boolean ;
   @Input() vueloIdaRegreso : boolean ;
   @Input() habilitarDescuentos : boolean;
   @Output() HabilitarReservas = new EventEmitter<boolean>() ;
   @Input() vueloSeleccionadoIda: Vuelo| null;
   @Input() vueloSeleccionadoRegreso: Vuelo| null;

  constructor(
    public reservaservice : ReservaService,
    public tiqueteService : TiqueteService,
    public  pasajeroservice : PasajeroService,
  ) { }

 
  ngOnInit(): void {
  }

  comprarViaje(){
    console.log('ingreso a descuentos ',this.listPasajeros)
    this.crearReserva();
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
        this.crearTiquete(pasajero,reserva, this.datosPasajeros[i].precioIda);
      });
    //   if(i == this.listPasajeros.length-1){
    //     this.HabilitarReservas.emit(true);
    //  }
  }
  this.habilitarDescuentos = false;
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
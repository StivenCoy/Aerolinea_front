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

@Component({
  selector: 'app-vuelos',
  templateUrl: './vuelos.component.html',
  styleUrls: ['./vuelos.component.css']
})
export class VuelosComponent implements OnInit {
  public origenes : Object[] =[] 
  public destinos : Object[] =[] 
  public lVuelos  : Object[] =[] 
  public lVuelosV  : Object[] =[] 
  public vuel :string[]=[]
  isVisa : boolean=true;
  public pasajero!: Pasajero;
  public reserva! : Reserva[];
  public vuelo! : Vuelo;
  pasajeroFrecuente : String=''; 

  ciudadOrigen : string='';
  selecte : string='';

  fecha : Date=new Date;
  cantidad :number=0;
  fechaR :Date=new Date;

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
      this.origenes=result;
    });
  }

  // listarIda(){ 
  //   this.rutaservice.listarDestinos(this.ciudadOrigen).subscribe(resultado => {
  //   this.destinos=resultado;
  // });
//}


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

listarIda(){ 
  this.vueloservice.buscarVuelo(1).subscribe(resultado => {
  this.vuelo=resultado;
});
}

// listarIda(){ 
//   this.reservaservice.listarReservas().subscribe(resultado => {
//   this.reserva=resultado;
// });
// }

listarVuelos(){
  console.log(this.fecha,this.ciudadOrigen, this.selecte, this.cantidad);
  this.vueloservice.listarVuelos(this.fecha, this.ciudadOrigen, this.selecte,this.cantidad).subscribe(res => {
    this.lVuelos=res;
    
  });
}
} 

import { Component, OnInit } from '@angular/core';
import { CiudadService } from '../service/ciudad.service';
import { PasajeroService } from '../service/pasajero.service';
import { RutaService } from '../service/ruta.service';
import { VueloService } from '../service/vuelo.service';

@Component({
  selector: 'app-vuelo',
  templateUrl: './vuelo.component.html',
  styleUrls: ['./vuelo.component.css']
})
export class VueloComponent implements OnInit {
  public origenes : Object[] =[] 
  public destinos : Object[] =[] 
  public lVuelos  : Object[] =[] 
  public lVuelosV  : Object[] =[] 
  public vuel :string[]=[]
  

  selected : string='';
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
  
  ) { }

  ngOnInit(): void {
    this.rutaservice.listarOrigenes().subscribe(result => {
      this.origenes=result;
    });
  }

}

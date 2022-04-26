import { Component, OnInit , Input} from '@angular/core';
import { TiqueteService } from 'src/app/service/tiquete.service';
import { ReservaService } from 'src/app/service/reserva.service';
import { ReservaInfo } from 'src/app/interfaces/reservaInfo';

@Component({
  selector: 'app-detalle-reservas',
  templateUrl: './detalle-reservas.component.html',
  styleUrls: ['./detalle-reservas.component.css']
})
export class DetalleReservasComponent implements OnInit {

   listReserva! : ReservaInfo[];
   habilitarReservas : boolean = false;
   habilitarTabla : boolean = false;

  constructor(
    public reservaservice : ReservaService,
    public tiqueteService : TiqueteService,
  ) { }
 
  ngOnInit(): void {
  }

  //lista las reservas existentes
  listarReservas(){ 
    this.reservaservice.listarReservas().subscribe(resultado => {
      this.habilitarTabla = true;
    this.listReserva=resultado;
  });
  } 
} 
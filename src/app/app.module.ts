import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InterfacesComponent } from './interfaces/interfaces.component';
import { ServiceComponent } from './service/service.component';
import { VuelosComponent } from './vuelos/vuelos.component';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { InfoVueloComponent } from './componentes/info-vuelo/info-vuelo.component';
import { DetalleVuelosComponent } from './componentes/detalle-vuelos/detalle-vuelos.component';
import { InfoPasajeroComponent } from './componentes/info-pasajero/info-pasajero.component';
import { DetalleDescuentosComponent } from './componentes/detalle-descuentos/detalle-descuentos.component';
import { DetalleReservasComponent } from './componentes/detalle-reservas/detalle-reservas.component'


@NgModule({
  declarations: [
    AppComponent,
    InterfacesComponent,
    ServiceComponent,
    VuelosComponent,
    InfoVueloComponent,
    DetalleVuelosComponent,
    InfoPasajeroComponent,
    DetalleDescuentosComponent,
    DetalleReservasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

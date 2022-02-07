import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InterfacesComponent } from './interfaces/interfaces.component';
import { ServiceComponent } from './service/service.component';
import { VuelosComponent } from './vuelos/vuelos.component';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { PasajeroComponent } from './pasajero/pasajero.component'


@NgModule({
  declarations: [
    AppComponent,
    InterfacesComponent,
    ServiceComponent,
    VuelosComponent,
    PasajeroComponent
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

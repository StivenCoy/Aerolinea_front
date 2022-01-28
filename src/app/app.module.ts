import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InterfacesComponent } from './interfaces/interfaces.component';
import { ServiceComponent } from './service/service.component';
import { VueloComponent } from './vuelo/vuelo.component';

@NgModule({
  declarations: [
    AppComponent,
    InterfacesComponent,
    ServiceComponent,
    VueloComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

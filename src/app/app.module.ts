import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RodapeComponent } from './components/rodape/rodape.component';
import { CabecalhoComponent } from './components/nao-logado/cabecalho/cabecalho.component';
import { HomeNlComponent } from './components/nao-logado/home-nl/home-nl.component';

@NgModule({
  declarations: [
    AppComponent,
    RodapeComponent,
    CabecalhoComponent,
    HomeNlComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RodapeComponent } from './components/rodape/rodape.component';
import { CabecalhoComponent } from './components/nao-logado/cabecalho/cabecalho.component';
import { HomeNlComponent } from './components/nao-logado/home-nl/home-nl.component';
import { CadastroUsuarioComponent } from './components/nao-logado/cadastro-usuario/cadastro-usuario.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { LoginComponent } from './components/nao-logado/login/login.component';
import { MapaNlComponent } from './components/nao-logado/mapa-nl/mapa-nl.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { PageNotFoundComponent } from './components/nao-logado/page-not-found/page-not-found.component';
import { PerfilUsuarioComponent } from './components/logado/perfil-usuario/perfil-usuario.component';

@NgModule({
  declarations: [
    AppComponent,
    RodapeComponent,
    CabecalhoComponent,
    HomeNlComponent,
    CadastroUsuarioComponent,
    LoginComponent,
    MapaNlComponent,
    PageNotFoundComponent,
    PerfilUsuarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxMaskDirective,
    NgxMaskPipe,
    GoogleMapsModule
  ],
  providers: [provideNgxMask()],
  bootstrap: [AppComponent]
})
export class AppModule { }

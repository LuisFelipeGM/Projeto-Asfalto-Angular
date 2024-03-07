import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeNlComponent } from './components/nao-logado/home-nl/home-nl.component';
import { CadastroUsuarioComponent } from './components/nao-logado/cadastro-usuario/cadastro-usuario.component';
import { LoginComponent } from './components/nao-logado/login/login.component';
import { MapaNlComponent } from './components/nao-logado/mapa-nl/mapa-nl.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeNlComponent
  },
  {
    path: 'cadastrarUsuario',
    component: CadastroUsuarioComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'mapa',
    component: MapaNlComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

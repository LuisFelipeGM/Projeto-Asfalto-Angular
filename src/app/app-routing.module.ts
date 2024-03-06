import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeNlComponent } from './components/nao-logado/home-nl/home-nl.component';
import { CadastroUsuarioComponent } from './components/nao-logado/cadastro-usuario/cadastro-usuario.component';

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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

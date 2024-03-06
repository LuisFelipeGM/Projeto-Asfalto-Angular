import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeNlComponent } from './components/nao-logado/home-nl/home-nl.component';

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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

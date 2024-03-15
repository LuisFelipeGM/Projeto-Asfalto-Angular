import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { UserService } from './user.service';
import { Router } from '@angular/router';

interface AuthReponse {
  token: string
}

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  private readonly API = 'http://localhost:8080/usuario';

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private router: Router
    ) { }


  autenticar(login: string, senha: string) : Observable<HttpResponse<AuthReponse>> {
    return this.http.post<AuthReponse>(`${this.API}/login`, 
    {login, senha}, 
    {observe: 'response'}).pipe(
      tap((response) => {
        const authToken = response.body?.token || '';
        this.userService.salvarToken(authToken)
      })
    );
  }

  verificandoToken() {
    if(this.userService.estaLogado()){
      if(parseInt(this.userService.tempoExpiracao()) > new Date().getTime()) {
        this.router.navigateByUrl('/perfil');
      } else {
        this.userService.logout();
      }
    }
  }

}

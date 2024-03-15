import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { BehaviorSubject } from 'rxjs';
import { Usuario } from './usuario';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userSubject = new BehaviorSubject<Usuario | null>(null);

  constructor(private tokenService: TokenService, private router: Router) {
    if(this.tokenService.possuiToken()) {
      this.decodificarJWT();
    }
   }

   decodificarJWT() {
    const token = this.tokenService.retornarToken();
    const user = jwtDecode(token) as Usuario;
    this.userSubject.next(user);
   }

   retornarUser() {
    return this.userSubject.asObservable();
   }

   salvarToken(token: string) {
      this.tokenService.salvarToken(token);
      this.verificarTokenExpirado();
      this.decodificarJWT();
   }

   logout() {
    this.tokenService.excluirToken();
    this.userSubject.next(null)
    this.router.navigate(['/login'], { queryParams: { sessaoExpirada: true } });
   }

   estaLogado() {
    return this.tokenService.possuiToken();
   }

   verificarTokenExpirado() {
    const expirationTime = new Date().getTime() + 1 * 60 * 60 * 1000;
    this.tokenService.salvarExpiracao(expirationTime);
    setTimeout(() => {
      this.logout();
    }, expirationTime - new Date().getTime());
   }

   tempoExpiracao() {
    return this.tokenService.retornarExpiracao();
   }

}

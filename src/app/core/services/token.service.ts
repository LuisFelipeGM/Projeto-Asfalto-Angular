import { Injectable } from '@angular/core';

const KEY = 'token';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  salvarToken(token: string) {
    return localStorage.setItem(KEY, token);
  }

  salvarExpiracao(time: number) {
    return localStorage.setItem("ex", time.toString());
  }

  excluirToken() {
    localStorage.removeItem(KEY);
    localStorage.removeItem("ex");
  }

  retornarToken() {
    return localStorage.getItem(KEY) ?? "";
  }

  retornarExpiracao() {
    return localStorage.getItem('ex') ?? "0";
  }

  possuiToken() {
    return !!this.retornarToken();
  }

}

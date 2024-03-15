import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Mensagem, SenhaUpdate, Usuario, UsuarioUpdate } from './usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private readonly API = 'http://localhost:8080/usuario';

  constructor(private http: HttpClient) { }

  listarAll(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.API}/`);
  }

  criar(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.API}/create`, usuario);
  }

  editar(id: number, usuario: UsuarioUpdate,): Observable<Usuario> {
    const url = `${this.API}/update/${id}`;
    return this.http.put<Usuario>(url, usuario);
  }

  editarSenha(id: number, senhas: SenhaUpdate): Observable<Mensagem> {

    const url = `${this.API}/update/senha/${id}`;
    return this.http.put<Mensagem>(url, senhas);
  }

  excluir(id: number): Observable<Usuario> {

    const url = `${this.API}/delete/${id}`;
    return this.http.delete<Usuario>(url);
  }

  buscarPorId(id: number): Observable<Usuario> {

    const url = `${this.API}/${id}`;
    return this.http.get<Usuario>(url);
  }


}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from './usuario';

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

  editar(usuario: Usuario): Observable<Usuario> {
    const url = `${this.API}/update/${usuario.id}`;
    return this.http.put<Usuario>(url, usuario);
  }

  editarSenha(usuario: Usuario): Observable<Usuario> {
    const url = `${this.API}/update/senha/${usuario.id}`;
    return this.http.put<Usuario>(url, usuario);
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

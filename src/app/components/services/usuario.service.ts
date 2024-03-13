import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SenhaUpdate, Usuario, UsuarioUpdate } from './usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private readonly API = 'http://localhost:8080/usuarios-service';

  constructor(private http: HttpClient) { }

  listarAll(token: string): Observable<Usuario[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })

    return this.http.get<Usuario[]>(`${this.API}/`, { headers });
  }

  criar(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.API}/create`, usuario);
  }

  editar(id: number, usuario: UsuarioUpdate, token: string): Observable<Usuario> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    const url = `${this.API}/update/${id}`;
    return this.http.put<Usuario>(url, usuario, { headers });
  }

  editarSenha(id: number, senhas: SenhaUpdate, token: string): Observable<string> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })

    const url = `${this.API}/update/senha/${id}`;
    return this.http.put<string>(url, senhas, { headers });
  }

  excluir(id: number, token: string): Observable<Usuario> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })

    const url = `${this.API}/delete/${id}`;
    return this.http.delete<Usuario>(url, { headers });
  }

  buscarPorId(id: number, token: string): Observable<Usuario> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })

    const url = `${this.API}/${id}`;
    return this.http.get<Usuario>(url, { headers });
  }


}

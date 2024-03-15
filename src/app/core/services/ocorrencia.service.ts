import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ocorrencia } from './ocorrencia';

@Injectable({
  providedIn: 'root'
})
export class OcorrenciaService {

  private readonly API = 'http://localhost:8081/ocorrencia';

  constructor(private http: HttpClient) { }

  listarTodos(): Observable<Ocorrencia[]> {
    return this.http.get<Ocorrencia[]>(`${this.API}/`);
  }

  listarOcorrenciasPorStatus(status: String): Observable<Ocorrencia[]> {
    return this.http.get<Ocorrencia[]>(`${this.API}/status/${status}`);
  }

}

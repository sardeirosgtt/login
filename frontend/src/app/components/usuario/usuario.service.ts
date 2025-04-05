import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from './usuario.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  baseUrl = environment.baseUrlBackend + '/usuarios';

  constructor(private http: HttpClient) {}

  read(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.baseUrl);
  }
  
  create(usuario: Usuario): Observable<String>{
    return this.http.post<String>(this.baseUrl , usuario)
  }  

  readById(id:number ): Observable<Usuario>{
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Usuario>(url)
  }

  update(usuario: Usuario): Observable<Usuario> {
    const url = `${this.baseUrl}/atualizar/${usuario.id}`;
    return this.http.put<Usuario>(url, usuario)
  }

  delete(id: number): Observable<Usuario> {
    const url = `${this.baseUrl}/deletar/${id}`;
    return this.http.put<Usuario>(url, id)
  }
}

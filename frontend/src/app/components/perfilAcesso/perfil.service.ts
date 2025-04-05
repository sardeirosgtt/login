import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Funcionalidade, Perfil } from './perfil.model';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class PerfilService {
    baseUrlPerfil = environment.baseUrlBackend + '/perfil';
    baseUrl = environment.baseUrlBackend + '/funcionalidades';

    constructor(private http: HttpClient) {}

    read(): Observable<Perfil[]> {
        return this.http.get<Perfil[]>(this.baseUrlPerfil);
    }
    readById(id: Number): Observable<Perfil> {
        const url = `${this.baseUrlPerfil}/${id}`;
        return this.http.get<Perfil>(url);
    }

    readFuncionalidades(): Observable<Funcionalidade[]> {
        return this.http.get<Funcionalidade[]>(this.baseUrl);
    }

    create(perfil: Perfil): Observable<Perfil> {
        return this.http.post<Perfil>(this.baseUrlPerfil, perfil);
    }

    update(perfil: Perfil): Observable<Perfil> {
        const url = `${this.baseUrlPerfil}/${perfil.id}`;
        return this.http.put<Perfil>(url, perfil);
    }

    delete(id: Number): Observable<void> {
        const url = `${this.baseUrlPerfil}/deletar/${id}`;
        return this.http.delete<void>(url);
    }
}

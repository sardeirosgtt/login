import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FazendaDTO, FazendaListDTO } from './fazenda.model';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class FazendaService {
    baseUrl = environment.baseUrlBackend + '/fazendas';

    constructor(private http: HttpClient) {}

    salvar(fazenda: FazendaDTO): Observable<FazendaDTO> {
        return this.http.post<FazendaDTO>(`${this.baseUrl}`, fazenda);
    }

    findAllAtivas(): Observable<FazendaListDTO[]> {
        return this.http.get<FazendaListDTO[]>(`${this.baseUrl}`);
    }

    ativarFazenda(id: number): Observable<void> {
        return this.http.put<void>(`${this.baseUrl}/${id}/ativar`, {});
    }
    desativarFazenda(id: number): Observable<void> {
        return this.http.put<void>(`${this.baseUrl}/${id}/desativar`, {});
    }

    editar(id: number, fazenda: FazendaDTO): Observable<FazendaDTO> {
        return this.http.put<FazendaDTO>(`${this.baseUrl}/${id}`, fazenda);
    }
}

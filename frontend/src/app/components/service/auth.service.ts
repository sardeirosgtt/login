import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private baseUrlPerfil = `${environment.baseUrlBackend}/usuarios/login`;

    constructor(private http: HttpClient, private router: Router) {}

    login(email: string, password: string): Observable<any> {
        return this.http.post(this.baseUrlPerfil, { email, password }).pipe(
            tap((response: any) => {
                if (response.token) {
                    this.setToken(response.token);
                    this.setUser(response.usuario);
                    this.setUserFunctionalities(
                        response.usuario.perfil.funcionalidades
                    );
                }
            })
        );
    }

    getToken() {
        return localStorage.getItem('Token');
    }

    logout() {
        this.removeToken();
        this.removeUserFunctionalities();
        this.removeUser();
        this.router.navigate(['login']);
    }

    public setUser(user: any): void {
        localStorage.setItem('User-One', JSON.stringify(user));
    }

    getUser(): any {
        const usuario = localStorage.getItem('User-One');
        return usuario ? JSON.parse(usuario) : [];
    }

    private removeUser() {
        localStorage.removeItem('User-One');
    }

    isAuthenticated() {
        return !!this.getToken();
    }

    private setToken(token: string): void {
        localStorage.setItem('Token', token);
    }

    private removeToken() {
        localStorage.removeItem('Token');
    }

    private setUserFunctionalities(functionalities: any[]): void {
        localStorage.setItem(
            'UserFunctionalities',
            JSON.stringify(functionalities)
        );
    }

    private removeUserFunctionalities() {
        localStorage.removeItem('UserFunctionalities');
    }

    getUserFunctionalities(): any[] {
        const functionalities = localStorage.getItem('UserFunctionalities');
        return functionalities ? JSON.parse(functionalities) : [];
    }

    hasFunctionality(functionalityName: string): boolean {
        const functionalities = this.getUserFunctionalities();
        return functionalities.some((f) => f.nome === functionalityName);
    }
}

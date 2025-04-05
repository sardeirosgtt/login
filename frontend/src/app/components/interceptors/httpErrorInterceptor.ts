import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { MessageService } from 'primeng/api';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
    constructor(private messageService: MessageService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            tap(event => {
                if (event instanceof HttpResponse && req.method !== 'GET') {
                    const message = event.headers.get('Message') || 'Operação realizada com sucesso!';
                    this.messageService.add({
                        key: 'global',
                        severity: 'success',
                        summary: 'Sucesso',
                        detail: message
                    });
                }
            }),
            catchError((error: HttpErrorResponse) => {
                const errorMessage = error.error?.message || 'Erro desconhecido ao processar a solicitação';

                this.messageService.add({
                    key: 'global',
                    severity: 'error',
                    summary: 'Erro',
                    detail: errorMessage
                });

                return throwError(() => new Error(errorMessage));
            })
        );
    }
}

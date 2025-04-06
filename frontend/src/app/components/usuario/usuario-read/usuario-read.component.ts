import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { UsuarioService } from '../usuario.service';
import { Usuario } from '../usuario.model';
import { UsuarioCreateComponent } from '../usuario-create/usuario-create.component';
import { AuthService } from '../../service/auth.service';

@Component({
    selector: 'app-usuario-read',
    providers: [MessageService],
    templateUrl: './usuario-read.component.html',
})
export class UsuarioReadComponent implements OnInit {
    usuarios: Usuario[] = [];
    loading: boolean = true;

    @ViewChild(UsuarioCreateComponent)
    usuarioCreateComponent!: UsuarioCreateComponent;

    constructor(
        private usuarioService: UsuarioService,
        private messageService: MessageService,
        private authService: AuthService
    ) {}

    ngOnInit(): void {
        this.loadUsuarios();
    }

    loadUsuarios() {
        this.usuarioService.read().subscribe((data) => {
            this.usuarios = data;
            this.loading = false;
        });
    }

    clear(table: any) {
        table.clear();
    }

    onGlobalFilter(table: any, event: any) {
        table.filterGlobal(event.target.value, 'contains');
    }

    deleteUsuario(usuario: Usuario) {
        this.usuarioService.delete(usuario.id).subscribe(() => {
            this.messageService.add({
                severity: 'success',
                summary: 'sucesso',
                detail: 'Usuário excluído com sucesso',
            });
            setTimeout(() => {
                this.ngOnInit();
            }, 1000);
        });
    }

    newUsuario(): void {
        this.usuarioCreateComponent.showDialog();
    }

    onConfirmCreate(confirm: boolean) {
        if (confirm) {
            setTimeout(() => {
                this.ngOnInit();
            }, 0);
        }
    }

    hasFunctionality(functionality: string): boolean {
        return this.authService.hasFunctionality(functionality);
    }
}

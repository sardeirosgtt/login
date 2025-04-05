import { Component, OnInit, ViewChild } from '@angular/core';
import { PerfilService } from '../perfil.service';
import { MessageService } from 'primeng/api';
import { Perfil } from '../perfil.model';
import { PerfilCreateComponent } from '../perfil-create/perfil-create.component';
import { AuthService } from '../../service/auth.service';

@Component({
    selector: 'app-perfil-read',
    providers: [MessageService],
    templateUrl: './perfil-read.component.html',
    styleUrl: './perfil-read.component.scss',
})
export class PerfilReadComponent implements OnInit {
    displayConfirmDialog: boolean = false;
    perfis: Perfil[] = [];
    loading: boolean = true;
    perfil: Perfil;
    confirmMessage: string = '';

    ngOnInit(): void {
        this.loadPerfil();
    }
    @ViewChild(PerfilCreateComponent)
    perfilCreateComponent!: PerfilCreateComponent;

    constructor(
        private perfilService: PerfilService,
        private messageService: MessageService,
        private authService : AuthService,
    ) {}

    loadPerfil() {
        this.perfilService.read().subscribe((data) => {
            this.perfis = data;
            this.loading = false;
        });
    }
    
    onGlobalFilter(table: any, event: any) {
        table.filterGlobal(event.target.value, 'contains');
    }

    clear(table: any) {
        table.clear();
    }

    newPerfil(): void {
        this.perfilCreateComponent.showDialog();
    }

    onConfirmCreate(confirm: boolean) {
        if (confirm) {
            this.messageService.add({
                severity: 'info',
                summary: 'Info',
                detail: 'Perfil criado com sucesso!',
            });

            setTimeout(() => {
                this.ngOnInit();
            }, 1000);
            this.loadPerfil();
        }
    }

    deleteUsuario(id: number) {
        this.confirmMessage = 'Tem certeza que deseja excluir este perfil?';
        this.displayConfirmDialog = true;
        this.perfil = this.perfis.find((p) => p.id === id)!;
    }

    onConfirmDelete(confirm: boolean) {
        if (confirm && this.perfil) {
            this.perfilService.delete(this.perfil.id).subscribe({
                next: () => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Sucesso',
                        detail: 'Perfil excluído com sucesso',
                    });
                    this.loadPerfil();
                },
                error: () => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Erro',
                        detail: 'Não foi possível excluir o perfil. Esse perfil pode estar associado a um usuário.',
                    });
                }
            });
        }
        this.displayConfirmDialog = false;
    }

    hasFunctionality(functionality: string): boolean {
        return this.authService.hasFunctionality(functionality);
    }
}

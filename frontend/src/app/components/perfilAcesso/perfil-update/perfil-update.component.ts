import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PerfilService } from '../perfil.service';
import { Funcionalidade, Perfil } from '../perfil.model';
import { MessageService } from 'primeng/api';

@Component({
    providers: [MessageService],
    selector: 'app-perfil-update',
    templateUrl: './perfil-update.component.html',
    styleUrls: ['./perfil-update.component.scss'],
})
export class PerfilUpdateComponent implements OnInit {
    @Output() perfilUpdated = new EventEmitter<void>();

    loading: boolean = true;
    perfil!: Perfil;
    funcionalidades: Funcionalidade[] = [];
    funcionalidadesPorModulo: {
        modulo: string;
        funcionalidades: Funcionalidade[];
    }[] = [];
    allSelected: boolean = false;
    visible: boolean = false;

    constructor(
        private perfilService: PerfilService,
        private router: Router,
        private route: ActivatedRoute,
        private messageService: MessageService
    ) {}

    ngOnInit(): void {
        const id = +this.route.snapshot.paramMap.get('id')!;
        this.loadPerfilById(id);
        this.loadFuncionalidades();
    }

    loadPerfilById(id: number): void {
        this.perfilService.readById(id).subscribe((perfil) => {
            this.perfil = perfil;
            this.loading = false;
            this.groupFuncionalidadesByModulo();
            this.visible = true;
        });
    }

    loadFuncionalidades(): void {
        this.perfilService.readFuncionalidades().subscribe((data) => {
            this.funcionalidades = data;
            this.groupFuncionalidadesByModulo();
        });
    }

    groupFuncionalidadesByModulo() {
        const grouped = this.funcionalidades.reduce((acc, funcionalidade) => {
            const modulo = funcionalidade.modulo;
            if (!acc[modulo]) {
                acc[modulo] = [];
            }
            acc[modulo].push(funcionalidade);
            return acc;
        }, {});

        this.funcionalidadesPorModulo = Object.keys(grouped)
            .sort() // Ordena os módulos alfabeticamente
            .map((modulo) => ({
                modulo: modulo,
                funcionalidades: grouped[modulo].sort((a, b) =>
                    a.nome.localeCompare(b.nome)
                ), // Ordena funcionalidades por nome
            }))
            .sort((a, b) => a.modulo.localeCompare(b.modulo)); // Ordena os módulos por nome
    }

    public camelCaseToSpaces(str: string): string {
        return str
            .replace(/([a-z0-9])([A-Z])/g, '$1 $2') // Insere espaço antes de cada letra maiúscula
            .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2'); // Trata acrônimos seguidos de palavras
    }

    toggleSelectAll() {
        if (this.allSelected) {
            this.perfil.funcionalidades = [];
        } else {
            this.perfil.funcionalidades = this.funcionalidades.slice();
        }
        this.allSelected = !this.allSelected;
    }

    onCheckboxChange(event: any, funcionalidade: Funcionalidade): void {
        if (event.checked) {
            if (
                !this.perfil.funcionalidades.some(
                    (f) => f.id === funcionalidade.id
                )
            ) {
                this.perfil.funcionalidades.push(funcionalidade);
            }
        } else {
            this.perfil.funcionalidades = this.perfil.funcionalidades.filter(
                (f) => f.id !== funcionalidade.id
            );
        }
    }

    updatePerfil(): void {
        this.perfilService.update(this.perfil).subscribe(() => {
            this.messageService.add({
                severity: 'success',
                summary: 'Sucesso',
                detail: 'Perfil atualizado com sucesso',
            });
            setTimeout(() => {
                this.router.navigate(['/perfil']);
            }, 1000);
        });
    }

    cancel(): void {
        this.router.navigate(['/perfil']);
    }
}

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Funcionalidade, Perfil } from '../perfil.model';
import { PerfilService } from '../perfil.service';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-perfil-create',
    templateUrl: './perfil-create.component.html',
    styleUrls: ['./perfil-create.component.scss'],
})
export class PerfilCreateComponent implements OnInit {
    @Output() confirm = new EventEmitter<boolean>();

    constructor(private perfilService: PerfilService, private messageService:MessageService) {}

    perfil: Perfil = {
        nome: '',
        funcionalidades: [],
    };
    loading: boolean = true;
    funcionalidades: Funcionalidade[] = [];
    funcionalidadesPorModulo: {
        modulo: string;
        funcionalidades: Funcionalidade[];
    }[] = [];
    allSelected: boolean = false;

    visible: boolean = false;

    ngOnInit(): void {
        this.loadFuncionalidades();
    }

    showDialog() {
        this.visible = true;
    }

    hideDialog() {
        this.visible = false;
    }

    loadFuncionalidades() {
        this.perfilService.readFuncionalidades().subscribe((data) => {
            this.funcionalidades = data;
            this.groupFuncionalidadesByModulo();
            this.loading = false;
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
          .sort()
          .map((modulo) => ({
            modulo: modulo,
            funcionalidades: grouped[modulo].sort((a, b) => a.nome.localeCompare(b.nome)),
          }))
          .sort((a, b) => a.modulo.localeCompare(b.modulo));
    }

    public camelCaseToSpaces(str: string): string {
        return str
          .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
          .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2');
    }

    toggleSelectAll() {
        if (this.allSelected) {
            this.perfil.funcionalidades = [];
        } else {
            this.perfil.funcionalidades = this.funcionalidades.slice();
        }
        this.allSelected = !this.allSelected;
    }

    createPerfil() {
        this.perfilService.create(this.perfil).subscribe(
            (response) => {
                this.confirm.emit(true);
                
                this.hideDialog();
            },
            (error) => {
                this.confirm.emit(false);
                this.messageService.add({severity: 'error', summary: 'Erro', detail: 'Falha ao criar o perfil. Por favor, tente novamente.'});
            }
        );
    }

    onConfirmCreate(confirm: boolean){
        if(confirm){
          this.messageService.add({ severity: 'sucess', summary: 'Sucesso', detail: 'Perfil criado com sucesso!' });
            setTimeout(() => {
                this.ngOnInit();
            }, 1000);
        }
      }

    cancel() {
        this.hideDialog();
    }
}

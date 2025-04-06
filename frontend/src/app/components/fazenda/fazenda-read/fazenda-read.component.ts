import { Component, ViewChild } from '@angular/core';
import { FazendaListDTO } from '../fazenda.model';
import { FazendaCreateComponent } from '../fazenda-create/fazenda-create.component';
import { FazendaService } from '../fazenda.service';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../service/auth.service';

@Component({
    selector: 'app-fazenda-read',
    templateUrl: './fazenda-read.component.html',
    styleUrl: './fazenda-read.component.scss',
})
export class FazendaReadComponent {
    @ViewChild(FazendaCreateComponent)
    fazendaCreate!: FazendaCreateComponent;
    fazendas: FazendaListDTO[] = [];
    loading: boolean = true;

    constructor(
        private fazendaService: FazendaService,
        private messageService: MessageService,
        private authService: AuthService
    ) {}

    ngOnInit(): void {
        this.loadFazendas();
    }

    loadFazendas() {
        this.fazendaService.findAllAtivas().subscribe((data) => {
            this.fazendas = data;
            this.loading = false;
        });
    }

    clear(table: any) {
        table.clear();
    }

    onGlobalFilter(table: any, event: any) {
        table.filterGlobal(event.target.value, 'contains');
    }

    desativarFazenda(id: number) {
        this.fazendaService.ativarFazenda(id).subscribe(() => {
            setTimeout(() => {
                this.ngOnInit();
            }, 1000);
        });
    }

    newFazenda(): void {
        this.fazendaCreate.showDialog();
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

import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { AuthService } from '../components/service/auth.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html',
})
export class AppMenuComponent implements OnInit {
    model: any[] = [];

    constructor(
        public layoutService: LayoutService,
        private authService: AuthService
    ) {}

    hasFunctionality(functionality: string): boolean {
        return this.authService.hasFunctionality(functionality);
    }

    ngOnInit() {
        this.model = [
            {
                label: 'Principal',
                items: [
                    {
                        label: 'Dashboard',
                        icon: 'pi pi-fw pi-home',
                        routerLink: ['/'],
                    },

                ],
            },
            {
                label: 'Serviços',
                items: [
                    {
                        label: 'Cadastros',
                        icon: 'pi pi-fw pi-file', 
                        items: [
                            {
                                label: 'Usuários',
                                icon: 'pi pi-fw pi-id-card',
                                routerLink: ['/usuario'],
                                visible: this.hasFunctionality('LISTAR_USUARIO'),
                            },
                            {
                                label: 'Perfil',
                                icon: 'pi pi-fw pi-truck',
                                routerLink: ['/perfil'],
                                visible: this.hasFunctionality('VER_PERFIL'),
                            },
                            {
                                label: 'Fazenda',
                                icon: 'pi pi-spin pi-sun',
                                routerLink: ['/fazenda'],
                                visible: this.hasFunctionality('LISTAR_FAZENDAS'),
                            },
                        ]
                    },

                ],
            },
        ];
    }
}

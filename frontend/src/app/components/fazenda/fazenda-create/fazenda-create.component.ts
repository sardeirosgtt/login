import { Component } from '@angular/core';

@Component({
    selector: 'app-fazenda-create',
    templateUrl: './fazenda-create.component.html',
    styleUrl: './fazenda-create.component.scss',
})
export class FazendaCreateComponent {
    visible: boolean = false;
    loading: boolean = true;

    showDialog() {
        this.visible = true;
    }

    hideDialog() {
        this.visible = false;
    }
}

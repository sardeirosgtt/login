import { Component, EventEmitter, Output } from '@angular/core';
import { Usuario } from '../usuario.model';
import { Perfil } from '../../perfilAcesso/perfil.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../usuario.service';
import { PerfilService } from '../../perfilAcesso/perfil.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../service/auth.service';

@Component({
    selector: 'app-usuario-create',
    templateUrl: './usuario-create.component.html',
    styleUrl: './usuario-create.component.scss',
})
export class UsuarioCreateComponent {
    @Output() confirm = new EventEmitter<boolean>();

    constructor(
        private formBuilder: FormBuilder,
        private usuarioservice: UsuarioService,
        private perfilService: PerfilService,
        private router: Router,
        private route: ActivatedRoute,
        private messageService: MessageService,
        private authService: AuthService
    ) {}
    usuarioForm!: FormGroup;

    perfis: Perfil[] = [];
    visible: boolean = false;
    loading: boolean = true;

    ngOnInit(): void {
        this.loadPerfis();
        this.usuarioForm = this.formBuilder.group({
            nome: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            perfil: ['', Validators.required],
            password: ['', Validators.required],
        });
    }

    createUsuario(): void {
        const newUsuario: Usuario = { ...this.usuarioForm.value };
        this.usuarioservice.create(newUsuario).subscribe(() => {
            this.hideDialog();
            this.confirm.emit(true);
        });
    }

    showDialog() {
        this.visible = true;
    }

    hideDialog() {
        this.visible = false;
    }

    loadPerfis(): void {
        this.perfilService.read().subscribe((perfis) => {
            this.perfis = perfis;
            this.loading = false;
        });
    }
}

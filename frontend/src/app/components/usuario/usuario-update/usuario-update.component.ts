import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Importe FormBuilder, FormGroup e Validators
import { Usuario } from '../usuario.model';
import { UsuarioService } from '../usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Perfil } from 'src/app/components/perfilAcesso/perfil.model';
import { PerfilService } from 'src/app/components/perfilAcesso/perfil.service';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../service/auth.service';

@Component({
    providers: [MessageService],
    selector: 'app-usuario-update',
    templateUrl: './usuario-update.component.html',
    styleUrls: ['./usuario-update.component.scss'],
})
export class UsuarioUpdateComponent implements OnInit {
    @Output() confirm = new EventEmitter<boolean>();

    usuario!: Usuario;
    usuarioForm!: FormGroup;
    perfis: Perfil[] = [];
    loading: boolean = true;
    visible: boolean = false;

    constructor(
        private formBuilder: FormBuilder,
        private usuarioservice: UsuarioService,
        private perfilService: PerfilService,
        private router: Router,
        private route: ActivatedRoute,
        private messageService: MessageService,
        private authService: AuthService
    ) {}

    ngOnInit(): void {
        this.usuarioForm = this.formBuilder.group({
            nome: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            perfil: ['', Validators.required],
            senha: [''],
        });

        this.route.params.subscribe((params) => {
            const id = params['id'];
            this.usuarioservice.readById(id).subscribe(
                (usuario) => {
                    this.usuarioForm.patchValue(usuario);
                    this.usuario = usuario;
                    this.loadPerfis();
                    this.loading = false;
                    this.visible = true;
                },
                (error) => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Erro',
                        detail: 'Falha ao carregar usuário',
                    });
                }
            );
        });
    }

    updateUsuario(): void {
        if (this.usuarioForm.valid) {
            const updatedUsuario: Usuario = { ...this.usuarioForm.value };
            updatedUsuario.id = this.usuario.id;

            console.log(updatedUsuario.senha);

            if (!updatedUsuario.senha) {
                delete updatedUsuario.password;
            } else {
                updatedUsuario.password = updatedUsuario.senha;
            }

            this.usuarioservice.update(updatedUsuario).subscribe(
                (response) => {
                    this.authService.setUser(response);
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Sucesso',
                        detail: 'Usuário atualizado com sucesso',
                    });
                    setTimeout(() => {
                        this.router.navigate(['/usuario']);
                    }, 1000);
                },
                (error) => {
                    console.error('Erro ao atualizar técnico:', error);
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Erro',
                        detail: 'Falha ao atualizar Usuário',
                    });
                }
            );
        }
    }

    loadPerfis(): void {
        this.perfilService.read().subscribe((perfis) => {
            this.perfis = perfis;
            this.loading = false;
        });
    }

    cancel(): void {
        this.router.navigate(['/usuario']);
    }
}

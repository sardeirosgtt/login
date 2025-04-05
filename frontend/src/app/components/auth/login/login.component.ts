import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Message, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';
import { AuthService } from 'src/app/components/service/auth.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  providers: [MessageService],
  styles: [`
    :host ::ng-deep .pi-eye,
    :host ::ng-deep .pi-eye-slash {
      transform: scale(1.6);
      margin-right: 1rem;
      color: var(--primary-color) !important;
    }
  `]
})
export class LoginComponent {
  msgs: Message[] = [];
  valCheck: string[] = ['remember'];
  login: string;
  password!: string;

  constructor(
    public layoutService: LayoutService,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {}

  logar() {
    this.authService.login(this.login, this.password).subscribe(
      () => {
        this.router.navigate(['']);
      },
      (error: any) => {
        this.messageService.add({key: 'tst', severity:'error', summary:'Erro no login', detail:'Verifique suas credenciais.'});
      }
    );
  }

    handleKeyDown(event: KeyboardEvent) {
        if (event.key === 'Enter') {
            this.logar();
        }
    }

  logout() {
    this.authService.logout();
  }

  getToken() {
    return this.authService.getToken();
  }

  isAuthenticate() {
    return this.authService.isAuthenticated();
  }
}

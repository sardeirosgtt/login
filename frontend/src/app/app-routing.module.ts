import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppLayoutComponent } from './layout/app.layout.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { AuthGuard } from './components/auth/login/auth-guard';
import { LogoutComponent } from './components/auth/login/logout';
import { UsuarioCreateComponent } from './components/usuario/usuario-create/usuario-create.component';
import { UsuarioReadComponent } from './components/usuario/usuario-read/usuario-read.component';
import { UsuarioUpdateComponent } from './components/usuario/usuario-update/usuario-update.component';
import { PerfilReadComponent } from './components/perfilAcesso/perfil-read/perfil-read.component';
import { PerfilCreateComponent } from './components/perfilAcesso/perfil-create/perfil-create.component';
import { PerfilUpdateComponent } from './components/perfilAcesso/perfil-update/perfil-update.component';
@NgModule({
    imports: [
        RouterModule.forRoot(
            [
                {
                    path: '',
                    component: AppLayoutComponent,
                    children: [
                        {
                            path: '',
                            loadChildren: () =>
                                import(
                                    './components/dashboard/dashboard.module'
                                ).then((m) => m.DashboardModule),
                        },
                        {
                            path: 'usuario',
                            component: UsuarioReadComponent,
                            canActivate: [AuthGuard],
                        },
                        {
                            path: 'usuario/create',
                            component: UsuarioCreateComponent,
                            canActivate: [AuthGuard],
                        },
                        {
                            path: 'usuario/update/:id',
                            component: UsuarioUpdateComponent,
                            canActivate: [AuthGuard],
                        },
                        {
                            path: 'perfil',
                            component: PerfilReadComponent,
                            canActivate: [AuthGuard],
                        },
                        {
                            path: 'perfil/create',
                            component: PerfilCreateComponent,
                            canActivate: [AuthGuard],
                        },
                        {
                            path: 'perfil/update/:id',
                            component: PerfilUpdateComponent,
                            canActivate: [AuthGuard],
                        },
                        {
                            path: 'logout',
                            component: LogoutComponent,
                        },
                    ],
                },
                {
                    path: 'auth',
                    loadChildren: () =>
                        import('./components/auth/auth.module').then(
                            (m) => m.AuthModule
                        ),
                },
                {
                    path: 'login',
                    loadChildren: () =>
                        import('./components/auth/login/login.module').then(
                            (m) => m.LoginModule
                        ),
                },

                { path: 'notfound', component: NotfoundComponent },
                { path: '**', redirectTo: '/notfound' },
            ],
            {
                scrollPositionRestoration: 'enabled',
                anchorScrolling: 'enabled',
                onSameUrlNavigation: 'reload',
            }
        ),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}

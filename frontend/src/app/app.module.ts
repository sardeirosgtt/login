import { NgModule } from '@angular/core';
import {
    CommonModule,
    LocationStrategy,
    PathLocationStrategy,
} from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { ToastModule } from 'primeng/toast';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputSwitchModule } from 'primeng/inputswitch';
import { CheckboxModule } from 'primeng/checkbox';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ChartModule } from 'primeng/chart';
import { TooltipModule } from 'primeng/tooltip';
import { PanelMenuModule } from 'primeng/panelmenu';
import { TreeModule } from 'primeng/tree';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { PrimeNGConfig, MessageService, ConfirmationService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { AccordionModule } from 'primeng/accordion';
import { CardModule } from 'primeng/card';
import { AuthInterceptor } from './components/auth/auth-interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { FieldsetModule } from 'primeng/fieldset';
import { ListboxModule } from 'primeng/listbox';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StepsModule } from 'primeng/steps';
import { PickListModule } from 'primeng/picklist';
import { FileUploadModule } from 'primeng/fileupload';
import { AvatarModule } from 'primeng/avatar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { UsuarioCreateComponent } from './components/usuario/usuario-create/usuario-create.component';
import { PerfilCreateComponent } from './components/perfilAcesso/perfil-create/perfil-create.component';
import { PerfilReadComponent } from './components/perfilAcesso/perfil-read/perfil-read.component';
import { PerfilUpdateComponent } from './components/perfilAcesso/perfil-update/perfil-update.component';
import { UsuarioReadComponent } from './components/usuario/usuario-read/usuario-read.component';
import { UsuarioUpdateComponent } from './components/usuario/usuario-update/usuario-update.component';
import { HttpErrorInterceptor } from './components/interceptors/httpErrorInterceptor';
import { FazendaCreateComponent } from './components/fazenda/fazenda-create/fazenda-create.component';
import { FazendaReadComponent } from './components/fazenda/fazenda-read/fazenda-read.component';
import { FazendaUpdateComponent } from './components/fazenda/fazenda-update/fazenda-update.component';

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}

@NgModule({
    declarations: [
        AppComponent,
        NotfoundComponent,
        PerfilCreateComponent,
        PerfilReadComponent,
        PerfilUpdateComponent,
        UsuarioCreateComponent,
        UsuarioReadComponent,
        UsuarioUpdateComponent,
        FazendaCreateComponent,
        FazendaReadComponent,
        FazendaUpdateComponent,


    ],
    imports: [
        AppRoutingModule,
        ReactiveFormsModule,
        AppLayoutModule,
        FormsModule,
        ButtonModule,
        InputSwitchModule,
        CheckboxModule,
        InputNumberModule,
        DropdownModule,
        TableModule,
        InputTextModule,
        CommonModule,
        CalendarModule,
        MessagesModule,
        MessageModule,
        ButtonModule,
        ToastModule,
        ChartModule,
        TooltipModule,
        CommonModule,
        TreeModule,
        DialogModule,
        AccordionModule,
        CardModule,
        BrowserModule,
        FieldsetModule,
        DialogModule,
        ListboxModule,
        BrowserAnimationsModule,
        StepsModule,
        PickListModule,
        FileUploadModule,
        AvatarModule,
        ConfirmDialogModule,
        

        // Para traducao dos filtros dos componentes
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient],
            },
        }),
        PanelMenuModule,
    ],
    providers: [
        { provide: LocationStrategy, useClass: PathLocationStrategy , },
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
        MessageService,
        ConfirmationService

    ],
    bootstrap: [AppComponent],
})
export class AppModule {
    constructor(private primengConfig: PrimeNGConfig) {
        this.primengConfig.setTranslation({
            startsWith: 'Começa com',
            contains: 'Contém',
            notContains: 'Não contém',
            endsWith: 'Termina com',
            equals: 'Igual a',
            notEquals: 'Diferente de',
            noFilter: 'Sem filtro',
            //filter: 'Filtro',
            lt: 'Menor que',
            lte: 'Menor ou igual a',
            gt: 'Maior que',
            gte: 'Maior ou igual a',
            dateIs: 'Data é',
            dateIsNot: 'Data não é',
            dateBefore: 'Data é anterior',
            dateAfter: 'Data é posterior',
            clear: 'Limpar',
            apply: 'Aplicar',
            matchAll: 'Corresponde a todos',
            matchAny: 'Corresponde a qualquer',
            addRule: 'Adicionar regra',
            removeRule: 'Remover regra',
            accept: 'Aceitar',
            reject: 'Rejeitar',
            choose: 'Escolher',
            upload: 'Upload',
            cancel: 'Cancelar',
            dayNames: [
                'Domingo',
                'Segunda-feira',
                'Terça-feira',
                'Quarta-feira',
                'Quinta-feira',
                'Sexta-feira',
                'Sábado',
            ],
            dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
            dayNamesMin: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
            monthNames: [
                'Janeiro',
                'Fevereiro',
                'Março',
                'Abril',
                'Maio',
                'Junho',
                'Julho',
                'Agosto',
                'Setembro',
                'Outubro',
                'Novembro',
                'Dezembro',
            ],
            monthNamesShort: [
                'Jan',
                'Fev',
                'Mar',
                'Abr',
                'Mai',
                'Jun',
                'Jul',
                'Ago',
                'Set',
                'Out',
                'Nov',
                'Dez',
            ],
            today: 'Hoje',
            weekHeader: 'Semana',
            firstDayOfWeek: 0,
            dateFormat: 'dd/mm/yy',
            weak: 'Fraco',
            medium: 'Médio',
            strong: 'Forte',
            passwordPrompt: 'Digite uma senha',
            emptyMessage: 'Nenhum resultado encontrado',
            emptyFilterMessage: 'Nenhum resultado encontrado',
        });
    }
}

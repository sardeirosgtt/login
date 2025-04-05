import { Perfil } from '../perfilAcesso/perfil.model';

export interface Usuario {
    id?: number;
    nome: String;
    email: String;
    password: String;
    perfil: Perfil;
    senha?: String;
}

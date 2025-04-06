import { Perfil } from '../perfilAcesso/perfil.model';

export interface Usuario {
    id?: number;
    nome: String;
    email: String;
    password: String;
    perfil: Perfil;
    senha?: String;
}

export interface UsuarioListDTO {
    id: number;
    nome: string;
    email: string;
  }

import { UsuarioListDTO } from "../usuario/usuario.model";

export interface FazendaDTO {
    id?: number;
    nomeFazenda: string;
    latitude: number;
    longitude: number;
    tamanhoHectares: number;
    objetivo: Objetivo;
    donoId: number;
    ativa?: boolean;
  }

  export interface FazendaListDTO {
    id: number;
    nomeFazenda: string;
    latitude: number;
    longitude: number;
    tamanhoHectares: number;
    objetivo: Objetivo;
    dono: UsuarioListDTO;
    ativa: boolean;
  }

  export enum Objetivo {
    AGRICULTURA = "AGRICULTURA",
    PECUARIA = "PECUARIA",
    MISTA = "MISTA",
  }
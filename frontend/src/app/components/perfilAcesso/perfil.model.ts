export interface Perfil {
    id?: number;
    nome: string;
    funcionalidades: Funcionalidade[];
}

export interface Funcionalidade {
    id?: number;
    nome: string;
    nomeLegivel: string;
    modulo: string;
}

export interface PerfilFuncionalidade {
    perfil: Perfil;
    Funcionalidade: Funcionalidade;
}

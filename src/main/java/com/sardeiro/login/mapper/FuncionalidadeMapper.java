package com.sardeiro.login.mapper;

import com.sardeiro.login.domain.Funcionalidade;
import com.sardeiro.login.dtos.FuncionalidadeDTO;

public class FuncionalidadeMapper {

    public static FuncionalidadeDTO toFuncionalidadeDTO(Funcionalidade funcionalidade) {
        if (funcionalidade == null) {
            return null;
        }

        return new FuncionalidadeDTO(
            funcionalidade.getId(),
            funcionalidade.getNome(),
            funcionalidade.getNomeLegivel(),
            funcionalidade.getModulo()
        );
    }

    public static Funcionalidade toFuncionalidade(FuncionalidadeDTO funcionalidadeDTO) {
        if (funcionalidadeDTO == null) {
            return null;
        }

        return new Funcionalidade(
            funcionalidadeDTO.id(),
            funcionalidadeDTO.nome(),
            funcionalidadeDTO.nomeLegivel(),
            funcionalidadeDTO.modulo()
        );
    }
}

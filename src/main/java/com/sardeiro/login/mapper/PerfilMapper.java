package com.sardeiro.login.mapper;



import java.util.stream.Collectors;
import com.sardeiro.login.domain.Perfil;
import com.sardeiro.login.dtos.PerfilDTO;

public class PerfilMapper {

    public static PerfilDTO toPerfilDTO(Perfil perfil) {
        if (perfil == null) {
            return null;
        }

        return new PerfilDTO(
            perfil.getId(),
            perfil.getNome(),
            perfil.getFuncionalidades().stream()
                .map(FuncionalidadeMapper::toFuncionalidadeDTO)
                .collect(Collectors.toSet())
        );
    }

    public static Perfil toPerfil(PerfilDTO perfilDTO) {
        if (perfilDTO == null) {
            return null;
        }

        return new Perfil(
            perfilDTO.id(),
            perfilDTO.nome(),
            perfilDTO.funcionalidades().stream()
                .map(FuncionalidadeMapper::toFuncionalidade)
                .collect(Collectors.toSet())
        );
    }
}

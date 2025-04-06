package com.sardeiro.agro.dtos.perfil;

import java.util.Set;

import com.sardeiro.agro.dtos.funcionalidades.FuncionalidadeDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PerfilDTO {
    private Integer id;
    private String nome;
    private Set<FuncionalidadeDTO> funcionalidades;
}   


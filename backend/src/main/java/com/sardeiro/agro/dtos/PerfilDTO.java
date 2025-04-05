package com.sardeiro.agro.dtos;

import java.util.Set;

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


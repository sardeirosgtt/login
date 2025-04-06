package com.sardeiro.agro.dtos.fazenda;

import java.math.BigDecimal;

import com.sardeiro.agro.domain.enuns.Objetivo;
import com.sardeiro.agro.dtos.usuarios.UsuarioListDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class FazendaListDTO {

    private Long id;
    private String nomeFazenda;
    private Double latitude;
    private Double longitude;
    private BigDecimal tamanhoHectares;
    private Objetivo objetivo;
    private UsuarioListDTO dono;
    private Boolean ativa;

}

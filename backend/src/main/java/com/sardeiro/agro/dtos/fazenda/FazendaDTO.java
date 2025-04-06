package com.sardeiro.agro.dtos.fazenda;

import java.math.BigDecimal;

import com.sardeiro.agro.domain.enuns.Objetivo;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FazendaDTO {

    private Long id;

    @NotNull(message = "O nome da fazenda é obrigatório.")
    @Size(max = 100, message = "O nome da fazenda deve ter no máximo 100 caracteres.")
    private String nomeFazenda;

    @NotNull(message = "A latitude é obrigatória.")
    private Double latitude;

    @NotNull(message = "A longitude é obrigatória.")
    private Double longitude;

    @NotNull(message = "O tamanho de hectares é obrigatório.")
    private BigDecimal tamanhoHectares;

    @NotNull(message = "O objetivo é obrigatório.")
    private Objetivo objetivo;

    @NotNull(message = "O dono é obrigatório.")
    private Long donoId;
    
    private Boolean ativa = false;

}

package com.sardeiro.agro.domain;

import java.math.BigDecimal;

import org.locationtech.jts.geom.Point;

import com.sardeiro.agro.domain.enuns.Objetivo;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Fazenda {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "usuario_seq")
    @SequenceGenerator(name = "usuario_seq", sequenceName = "usuario_seq", allocationSize = 1)
    private Long id;

    @NotNull(message = "O nome da fazenda é obrigatório.")
    @Size(max = 100, message = "O nome da fazenda deve ter no máximo 100 caracteres.")
    @Column(nullable = false)
    private String nomeFazenda;
 
    //CREATE EXTENSION IF NOT EXISTS postgis;
    @NotNull(message = "A localização é obrigatória.")
    @Column(columnDefinition = "GEOMETRY(Point, 4326)", nullable = false)
    private Point localizacao;

    @NotNull(message = "O tamanho de hectares é obrigatório.")
    @Column(precision = 10, scale = 2, nullable = false)
    private BigDecimal tamanhoHectares;

    @NotNull(message = "O objetivo é obrigatório.")
    @Enumerated(EnumType.STRING)
    private Objetivo objetivo;

    @NotNull(message = "O dono é obrigatório.")
    @ManyToOne
    @JoinColumn(name = "dono_id", nullable = false)
    private Usuario dono;

    @NotNull(message = "Especifique se esta ativa")
    @Column(nullable = false)
    private Boolean ativa = false;

}

package com.sardeiro.agro.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FuncionalidadeDTO
{  
    private Long id;
    private String nome;
    private String nomeLegivel;
    private String modulo;
 }

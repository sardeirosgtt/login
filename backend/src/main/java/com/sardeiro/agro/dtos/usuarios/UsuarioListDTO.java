package com.sardeiro.agro.dtos.usuarios;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UsuarioListDTO {

    private Long id;
    private String nome;
    private String email;

}

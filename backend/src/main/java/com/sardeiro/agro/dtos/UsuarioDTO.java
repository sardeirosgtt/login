package com.sardeiro.agro.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UsuarioDTO{
    private Long id;
    private String nome;
    private String email;
    private String password;
    private PerfilDTO perfil;  
} 

package com.sardeiro.login.dtos;

public record UsuarioDTO(
    Long id,
    String nome,
    String email,
    String password,
    String telefone,
    String cpf, 
    PerfilDTO perfil
) {
}

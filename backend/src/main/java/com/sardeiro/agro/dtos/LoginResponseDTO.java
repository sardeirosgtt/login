package com.sardeiro.agro.dtos;

import com.sardeiro.agro.domain.Usuario;

public record LoginResponseDTO(String token, Usuario usuario) {

}

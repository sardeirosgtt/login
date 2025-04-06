package com.sardeiro.agro.dtos.seguranca;

import com.sardeiro.agro.domain.Usuario;

public record LoginResponseDTO(String token, Usuario usuario) {

}

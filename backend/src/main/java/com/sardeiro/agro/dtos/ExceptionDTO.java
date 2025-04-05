package com.sardeiro.agro.dtos;

import java.time.LocalDateTime;

public record ExceptionDTO(String message, String statusCode,LocalDateTime timestamp) {
    
}

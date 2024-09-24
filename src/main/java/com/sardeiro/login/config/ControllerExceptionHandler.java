package com.sardeiro.login.config;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import com.sardeiro.login.dtos.ExceptionDTO;
import jakarta.persistence.EntityNotFoundException;

import java.time.LocalDateTime;

@RestControllerAdvice
public class ControllerExceptionHandler {

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<ExceptionDTO> handleDataIntegrityViolation(DataIntegrityViolationException exception) {
        ExceptionDTO exceptionDTO = new ExceptionDTO(
            "já cadastrado", 
            HttpStatus.BAD_REQUEST.toString(),
            LocalDateTime.now()
        );
        return ResponseEntity.badRequest().body(exceptionDTO);
    } 

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<ExceptionDTO> handleEntityNotFound(EntityNotFoundException exception) {
        ExceptionDTO exceptionDTO = new ExceptionDTO(
            "Não encontrada", 
            HttpStatus.NOT_FOUND.toString(),
            LocalDateTime.now()
        );
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(exceptionDTO);
    } 

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ExceptionDTO> handleGeneralException(Exception exception) {
        ExceptionDTO exceptionDTO = new ExceptionDTO(
            "Ocorreu um erro inesperado: " + exception.getMessage(),
            HttpStatus.INTERNAL_SERVER_ERROR.toString(),
            LocalDateTime.now()
        );
        return ResponseEntity.internalServerError().body(exceptionDTO);
    } 
}

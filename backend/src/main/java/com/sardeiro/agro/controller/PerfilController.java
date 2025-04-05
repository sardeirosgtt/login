package com.sardeiro.agro.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.sardeiro.agro.dtos.PerfilDTO;
import com.sardeiro.agro.service.PerfilService;



@RestController
@RequestMapping("/perfil")
public class PerfilController {

    
    @Autowired
    private PerfilService service;

    @PreAuthorize("hasAuthority('VER_PERFIL')")
    @GetMapping
    public ResponseEntity<List<PerfilDTO>> listarTodos() {
        List<PerfilDTO> perfilDTOs = service.listarTodos();
        return ResponseEntity.ok(perfilDTOs);
    }

    @PreAuthorize("hasAuthority('CRIAR_PERFIL')")
    @PostMapping
    public ResponseEntity<PerfilDTO> salvar(@RequestBody PerfilDTO perfilDTO) {
        PerfilDTO perfilSalvoDTO = service.salvar(perfilDTO);
        return ResponseEntity.ok(perfilSalvoDTO);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PerfilDTO> buscarPorId(@PathVariable Long id) {
        return service.GetById(id)
                      .map(ResponseEntity::ok)
                      .orElse(ResponseEntity.notFound().build());
    }

    @PreAuthorize("hasAuthority('EDITAR_PERFIL')")
    @PutMapping("/{id}")
    public ResponseEntity<PerfilDTO> atualizar(@PathVariable Long id, @RequestBody PerfilDTO perfilDTO) {
        PerfilDTO perfilAtualizadoDTO = service.atualizar(id, perfilDTO);
        return ResponseEntity.ok(perfilAtualizadoDTO);
    }

    @PreAuthorize("hasAuthority('DELETAR_PERFIL')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        boolean deletado = service.deletar(id);
        if (deletado) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}

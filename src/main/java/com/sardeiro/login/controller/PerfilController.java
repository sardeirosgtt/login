package com.sardeiro.login.controller;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import com.sardeiro.login.domain.Perfil;
import com.sardeiro.login.dtos.PerfilDTO;
import com.sardeiro.login.mapper.PerfilMapper;
import com.sardeiro.login.service.PerfilService;



@RestController
@RequestMapping("/perfil")
public class PerfilController {

    @Autowired
    private PerfilService service;


    @PreAuthorize("hasAuthority('VER_PERFIL')")
    @GetMapping
    public ResponseEntity<List<PerfilDTO>> listarTodos() {
        List<Perfil> perfis = service.listarTodos();
        List<PerfilDTO> perfilDTOs = perfis.stream()
                                           .map(PerfilMapper::toPerfilDTO)
                                           .collect(Collectors.toList());
        return ResponseEntity.ok(perfilDTOs);
    }

    @PreAuthorize("hasAuthority('CRIAR_PERFIL')")
    @PostMapping
    public ResponseEntity<PerfilDTO> salvar(@RequestBody PerfilDTO perfilDTO) {
        Perfil perfil = PerfilMapper.toPerfil(perfilDTO);
        Perfil perfilSalvo = service.salvar(perfil);
        PerfilDTO perfilDTOs = PerfilMapper.toPerfilDTO(perfilSalvo);
        return ResponseEntity.ok(perfilDTOs);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PerfilDTO> buscarPorId(@PathVariable Long id) {
        Optional<Perfil> perfilOpt = service.GetById(id);
        if (perfilOpt.isPresent()) {
            PerfilDTO perfilDTO = PerfilMapper.toPerfilDTO(perfilOpt.get());
            return ResponseEntity.ok(perfilDTO);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PreAuthorize("hasAuthority('EDITAR_PERFIL')")
    @PutMapping("/atualizar/{id}")
    public ResponseEntity<PerfilDTO> atualizar(@PathVariable Long id, @RequestBody PerfilDTO perfilDTO) {
        Perfil perfil = PerfilMapper.toPerfil(perfilDTO);
        Perfil perfilAtualizado = service.atualizar(id, perfil);
        PerfilDTO perfilAtualizadoDTO = PerfilMapper.toPerfilDTO(perfilAtualizado);
        return ResponseEntity.ok(perfilAtualizadoDTO);
    }

    @DeleteMapping("/deletar/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        boolean deletado = service.deletar(id);
        if (deletado) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}

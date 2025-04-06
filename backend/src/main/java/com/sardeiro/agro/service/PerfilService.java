package com.sardeiro.agro.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sardeiro.agro.domain.Perfil;
import com.sardeiro.agro.dtos.perfil.PerfilDTO;


@Service
public class PerfilService {

    @Autowired
    private com.sardeiro.agro.repository.PerfilRepository repository;

    @Autowired
    private ModelMapper modelMapper;

    @org.springframework.transaction.annotation.Transactional(readOnly = true)
    public List<PerfilDTO> listarTodos() {
        List<Perfil> perfis = repository.findAll();
        return perfis.stream()
                     .map(perfil -> modelMapper.map(perfil, PerfilDTO.class))
                     .collect(Collectors.toList());
    }

    @org.springframework.transaction.annotation.Transactional
    public PerfilDTO salvar(PerfilDTO novoPerfilDTO) {
        novoPerfilDTO.setNome(novoPerfilDTO.getNome().toUpperCase());
        Perfil novoPerfil = modelMapper.map(novoPerfilDTO, Perfil.class);
        Perfil perfilSalvo = repository.save(novoPerfil);
        return modelMapper.map(perfilSalvo, PerfilDTO.class);
    }

    public Optional<PerfilDTO> GetById(Long id) {
        return repository.findById(id)
                         .map(perfil -> modelMapper.map(perfil, PerfilDTO.class));
    }

    @org.springframework.transaction.annotation.Transactional
    public PerfilDTO atualizar(Long id, PerfilDTO perfilAtualizadoDTO) {
        Perfil perfilAtualizado = modelMapper.map(perfilAtualizadoDTO, Perfil.class);
        return repository.findById(id)
                         .map(perfil -> {
                             perfil.setNome(perfilAtualizado.getNome().toUpperCase());
                             perfil.setFuncionalidades(perfilAtualizado.getFuncionalidades());
                             repository.save(perfil);
                             return modelMapper.map(perfil, PerfilDTO.class);
                         })
                         .orElse(null);
    }

    @org.springframework.transaction.annotation.Transactional
    public boolean deletar(Long id) {
        return repository.findById(id)
                         .map(perfil -> {
                             repository.delete(perfil);
                             return true;
                         })
                         .orElse(false);
    }

}

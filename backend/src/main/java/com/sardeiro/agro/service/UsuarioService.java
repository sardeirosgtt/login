package com.sardeiro.agro.service;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sardeiro.agro.domain.Perfil;
import com.sardeiro.agro.domain.Usuario;
import com.sardeiro.agro.dtos.usuarios.UsuarioDTO;
import com.sardeiro.agro.repository.UsuarioRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository repository;

    @Autowired
    private ModelMapper modelMapper;

    @org.springframework.transaction.annotation.Transactional
    public UsuarioDTO salvar(UsuarioDTO usuarioDTO) {

        Usuario usuario = modelMapper.map(usuarioDTO, Usuario.class);

        Usuario usuarioSalvo = repository.save(usuario);

        return modelMapper.map(usuarioSalvo, UsuarioDTO.class);
    }

    public List<UsuarioDTO> findAll() {
        List<Usuario> users = repository.findAll();
        return users.stream()
                .sorted(Comparator.comparing(Usuario::getNome)) // Ordena pela propriedade "nome" do usuário
                .map(user -> modelMapper.map(user, UsuarioDTO.class))
                .collect(Collectors.toList());
    }

    public UsuarioDTO findById(Long id) {
        return repository.findById(id)
                .map(user -> modelMapper.map(user, UsuarioDTO.class))
                .orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado com o ID: " + id));
    }

    @org.springframework.transaction.annotation.Transactional
    public Usuario atualizar(Long id, UsuarioDTO usuarioAtualizado) {
        return repository.findById(id)
                .map(usuario -> {
                    usuario.setNome(usuarioAtualizado.getNome().toUpperCase());
                    usuario.setEmail(usuarioAtualizado.getEmail().toUpperCase());
                    usuario.setPerfil(modelMapper.map(usuarioAtualizado.getPerfil(), Perfil.class));

                    // Apenas atualiza a senha se foi informada
                    if (usuarioAtualizado.getPassword() != null && !usuarioAtualizado.getPassword().isEmpty()) {
                        usuario.setPassword(usuarioAtualizado.getPassword());
                    }

                    repository.save(usuario);
                    return usuario;
                })
                .orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado para o ID: " + id));
    }
}

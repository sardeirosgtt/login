package com.sardeiro.login.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.sardeiro.login.domain.Usuario;
import com.sardeiro.login.dtos.UsuarioDTO;
import com.sardeiro.login.mapper.UsuarioMapper;
import com.sardeiro.login.repository.UsuarioRepository;


@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository repository;

    @org.springframework.transaction.annotation.Transactional
    public Usuario salvar(UsuarioDTO novoUsuario) {
        return repository.save(UsuarioMapper.toUsuario(novoUsuario));
    }
}

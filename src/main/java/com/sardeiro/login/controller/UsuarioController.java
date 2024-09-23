package com.sardeiro.login.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.sardeiro.login.domain.Usuario;
import com.sardeiro.login.dtos.AuthenticationRecord;
import com.sardeiro.login.dtos.LoginResponseDTO;
import com.sardeiro.login.dtos.UsuarioDTO;
import com.sardeiro.login.mapper.UsuarioMapper;
import com.sardeiro.login.seguranca.TokenService;
import com.sardeiro.login.service.UsuarioService;


@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService service;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private TokenService tokenService;

    @Autowired    
    private PasswordEncoder passwordEncoder;

    @PreAuthorize("hasAuthority('CRIAR_USUARIO')")
    @PostMapping
    public ResponseEntity<Usuario> salvar(@RequestBody UsuarioDTO usuarioDTO) {
        String senhaCodificada = passwordEncoder.encode(usuarioDTO.password());
        String emailConvertido = usuarioDTO.email().toUpperCase();
        String nomeConvertido = usuarioDTO.nome().toUpperCase();
        
        UsuarioDTO usuarioDTOTransformado = new UsuarioDTO(
            usuarioDTO.id(),
            nomeConvertido,
            emailConvertido, 
            senhaCodificada,
            usuarioDTO.telefone(),
            usuarioDTO.cpf(),
            usuarioDTO.perfil()
        );

        Usuario usuario = service.salvar(usuarioDTOTransformado);
        return new ResponseEntity<>(usuario,HttpStatus.CREATED);
        
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody @Validated AuthenticationRecord data) {
        var usernamePassword = new UsernamePasswordAuthenticationToken(data.email().toUpperCase(), data.password());
        var auth = this.authenticationManager.authenticate(usernamePassword);
        Usuario usuario = (Usuario) auth.getPrincipal();
        var token = tokenService.generateToken((Usuario) auth.getPrincipal());
        return ResponseEntity.ok(new LoginResponseDTO(token, UsuarioMapper.toUsuarioDTO(usuario)));
    }
    
}

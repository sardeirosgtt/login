package com.sardeiro.agro.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus; 
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sardeiro.agro.domain.Usuario;
import com.sardeiro.agro.dtos.AuthenticationRecord;
import com.sardeiro.agro.dtos.LoginResponseDTO;
import com.sardeiro.agro.dtos.UsuarioDTO;
import com.sardeiro.agro.seguranca.TokenService;
import com.sardeiro.agro.service.UsuarioService;


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
    public ResponseEntity<UsuarioDTO> salvar(@RequestBody UsuarioDTO usuarioDTO) {

        String senhaCodificada = passwordEncoder.encode(usuarioDTO.getPassword());
        String loginConvertido = usuarioDTO.getEmail().toUpperCase();
        String nomeConvertido = usuarioDTO.getNome().toUpperCase();
        
        UsuarioDTO usuarioDTOTransformado = new UsuarioDTO(
                usuarioDTO.getId(),
                nomeConvertido,
                loginConvertido,
                senhaCodificada,
                usuarioDTO.getPerfil()
        );
        UsuarioDTO usuario = service.salvar(usuarioDTOTransformado);
        return ResponseEntity
            .status(HttpStatus.CREATED)
            .header("Message", "Usuário cadastrado com sucesso!")
            .body(usuario);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody @Validated AuthenticationRecord data) {
        var usernamePassword = new UsernamePasswordAuthenticationToken(data.email().toUpperCase(), data.password());
        var auth = authenticationManager.authenticate(usernamePassword);
        var usuario = (Usuario) auth.getPrincipal();
        var token = tokenService.generateToken(usuario);
        return ResponseEntity.ok(new LoginResponseDTO(token, usuario));
    }

    @PreAuthorize("hasAuthority('LISTAR_USUARIO')")
    @GetMapping()
    public List<UsuarioDTO> findAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public UsuarioDTO findById(@PathVariable("id") Long Id) {
        return service.findById(Id);
    }
    

    @PreAuthorize("hasAuthority('EDITAR_USUARIO')")
    @PutMapping("/atualizar/{id}")
    public Usuario atualizar(@PathVariable Long id, @RequestBody UsuarioDTO usuarioAtualizado) {
        if (usuarioAtualizado.getPassword() != null && !usuarioAtualizado.getPassword().isEmpty()) {
            usuarioAtualizado.setPassword(passwordEncoder.encode(usuarioAtualizado.getPassword()));
        }
        return service.atualizar(id, usuarioAtualizado);
    }
    
}

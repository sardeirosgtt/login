package com.sardeiro.agro.service;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.sardeiro.agro.domain.Fazenda;
import com.sardeiro.agro.domain.Usuario;
import com.sardeiro.agro.dtos.fazenda.FazendaDTO;
import com.sardeiro.agro.dtos.fazenda.FazendaListDTO;
import com.sardeiro.agro.repository.FazendaRepository;
import com.sardeiro.agro.repository.UsuarioRepository;


@Service
public class FazendaService {

    @Autowired
    private FazendaRepository repository;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Transactional
    public FazendaDTO salvar(FazendaDTO fazendaDTO) {

        Usuario dono = usuarioRepository.findById(fazendaDTO.getDonoId())
            .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        Fazenda fazenda = modelMapper.map(fazendaDTO, Fazenda.class);
        fazenda.setDono(dono);

        Fazenda fazendaSalva = repository.save(fazenda);

        return modelMapper.map(fazendaSalva, FazendaDTO.class);
    }

    @Transactional
    public List<FazendaDTO> findAll(){
        List<Fazenda> fazendas = repository.findAll();
        return fazendas.stream()
                .sorted(Comparator.comparing(Fazenda:: getNomeFazenda))
                .map(faz -> modelMapper.map(faz, FazendaDTO.class))
                .collect(Collectors.toList());
    }

    @Transactional
    public List<FazendaListDTO> findAllAtivas(){
        List<Fazenda> fazendas = repository.findByAtivaTrue();
        return fazendas.stream()
                .sorted(Comparator.comparing(Fazenda:: getNomeFazenda))
                .map(faz -> modelMapper.map(faz, FazendaListDTO.class))
                .collect(Collectors.toList());
    }

    @Transactional
    public void ativarFazenda(Long id) {
        Fazenda fazenda = repository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Fazenda não encontrada"));
        fazenda.setAtiva(true);
        repository.save(fazenda);
    }



}

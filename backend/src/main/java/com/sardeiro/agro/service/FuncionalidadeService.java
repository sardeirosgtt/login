package com.sardeiro.agro.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sardeiro.agro.domain.Funcionalidade;
import com.sardeiro.agro.dtos.FuncionalidadeDTO;
import com.sardeiro.agro.repository.FuncionalidadeRepository;


@Service
public class FuncionalidadeService {

    @Autowired
    private FuncionalidadeRepository repository;

    @Autowired
    private ModelMapper modelMapper;

    public List<FuncionalidadeDTO> findAll(){
        List<Funcionalidade> funcs = repository.findAll();
        return funcs.stream()
                .map(func -> modelMapper.map(func, FuncionalidadeDTO.class))
                .collect(Collectors.toList());
    }
    
}

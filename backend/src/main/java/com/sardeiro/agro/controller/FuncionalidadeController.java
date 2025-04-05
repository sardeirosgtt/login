package com.sardeiro.agro.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sardeiro.agro.dtos.FuncionalidadeDTO;
import com.sardeiro.agro.service.FuncionalidadeService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
@RequestMapping("/funcionalidades")
public class FuncionalidadeController {

    @Autowired
    private FuncionalidadeService service;

    @GetMapping()
    public List<FuncionalidadeDTO> findAll() {
        return service.findAll();
    }
    
    
}

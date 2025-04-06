package com.sardeiro.agro.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sardeiro.agro.dtos.fazenda.FazendaDTO;
import com.sardeiro.agro.dtos.fazenda.FazendaListDTO;
import com.sardeiro.agro.service.FazendaService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;



@RestController
@RequestMapping("/fazenda")
public class FazendaController {

    @Autowired
    private FazendaService fazendaService;

    @PostMapping()
    public ResponseEntity<FazendaDTO> salvar(@RequestBody FazendaDTO fazendaDto) {
        FazendaDTO fazendaSave = fazendaService.salvar(fazendaDto);

        return ResponseEntity
            .status(HttpStatus.CREATED)
            .header("Message", "Fazenda cadastrada com sucesso!")
            .body(fazendaSave);
    }

    @GetMapping()
    public ResponseEntity<List<FazendaListDTO>> findAllAtivas() {
        List<FazendaListDTO> fazendas = fazendaService.findAllAtivas();
        return ResponseEntity
        .status(HttpStatus.CREATED)
        .body(fazendas);
    }

    @PutMapping("/{id}/ativar")
    public ResponseEntity<Void> ativarFazenda(@PathVariable Long id) {
        fazendaService.ativarFazenda(id);
        return ResponseEntity.noContent().build();
    }

    
    


}

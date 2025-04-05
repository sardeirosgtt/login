package com.sardeiro.agro.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sardeiro.agro.domain.Perfil;



public interface PerfilRepository extends JpaRepository<Perfil,Long> {
    
}

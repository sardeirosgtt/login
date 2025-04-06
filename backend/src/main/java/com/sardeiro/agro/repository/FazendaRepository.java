package com.sardeiro.agro.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sardeiro.agro.domain.Fazenda;

@Repository
public interface FazendaRepository extends JpaRepository<Fazenda, Long>{

    List<Fazenda> findByAtivaTrue();
}

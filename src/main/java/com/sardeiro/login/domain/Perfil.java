package com.sardeiro.login.domain;

import java.util.Set;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "perfil")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Perfil {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false )
    private String nome;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
        name = "perfil_funcionalidade",
        joinColumns = @JoinColumn(name = "perfil_id"),
        inverseJoinColumns = @JoinColumn(name = "funcionalidade_id")
    )
    private Set<Funcionalidade> funcionalidades;
}


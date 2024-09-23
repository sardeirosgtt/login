package com.sardeiro.login.seguranca;

import org.springframework.beans.factory.ListableBeanFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.annotation.AnnotationUtils;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RestController;
import com.sardeiro.login.domain.Funcionalidade;
import com.sardeiro.login.repository.FuncionalidadeRepository;
import jakarta.annotation.PostConstruct;

import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@Component
public class FuncionalidadeInitializer {

    @Autowired
    private FuncionalidadeRepository funcionalidadeRepository;

    @Autowired
    private ListableBeanFactory listableBeanFactory;


    @PostConstruct
    public void init() {
        Map<String, Object> beansWithAnnotation = listableBeanFactory.getBeansWithAnnotation(RestController.class);
        Set<Funcionalidade> funcionalidades = new HashSet<>();

        beansWithAnnotation.values().forEach(bean -> {
            String modulo = bean.getClass().getSimpleName().replace("Controller", ""); // Extraindo o módulo
            Method[] methods = bean.getClass().getDeclaredMethods();
            for (Method method : methods) {
                PreAuthorize preAuthorize = AnnotationUtils.findAnnotation(method, PreAuthorize.class);
                if (preAuthorize != null) {
                    String value = preAuthorize.value();
                    if (value.startsWith("hasAuthority('") && value.endsWith("')")) {
                        String nome = value.substring(14, value.length() - 2);
                        String nomeLegivel = convertToLegivel(nome);

                        // Realizar a dupla checagem do módulo baseado no nome da funcionalidade
                        String moduloCorreto = detectarModuloCorreto(modulo, nome);
                        funcionalidades.add(new Funcionalidade(nome, nomeLegivel, moduloCorreto));
                    }
                }
            }
        });

        saveFunctionalidades(funcionalidades);
    }

    private String detectarModuloCorreto(String modulo, String nomeFuncionalidade) {
        Map<String, String> mapeamentoModuloPorFuncionalidade = new HashMap<>();
        mapeamentoModuloPorFuncionalidade.put("EDIFICIO", "Edificio");
        mapeamentoModuloPorFuncionalidade.put("CLIENTE", "Cliente");
        mapeamentoModuloPorFuncionalidade.put("RELATORIO", "Relatório");
        mapeamentoModuloPorFuncionalidade.put("ORDEM_SERVICO", "Ordem De Serviço");
        mapeamentoModuloPorFuncionalidade.put("PERFIL", "Perfil");

        for (Map.Entry<String, String> entry : mapeamentoModuloPorFuncionalidade.entrySet()) {
            if (nomeFuncionalidade.contains(entry.getKey())) {
                System.out.println("--> " + nomeFuncionalidade + " - " + entry.getKey());
                return entry.getValue();
            }
        }
        return modulo; // Retorna o módulo original se nenhuma correspondência for encontrada
    }

    private String convertToLegivel(String nome) {
        // Converter o nome para uma forma legível
        return nome.replace("_", " ").toUpperCase();
    }

    private void saveFunctionalidades(Set<Funcionalidade> funcionalidades) {
        Set<String> existingFunctionalidades = funcionalidadeRepository.findByNomeIn(
            funcionalidades.stream().map(Funcionalidade::getNome).collect(Collectors.toSet())
        ).stream().map(Funcionalidade::getNome).collect(Collectors.toSet());

        funcionalidades.stream()
            .filter(func -> !existingFunctionalidades.contains(func.getNome()))
            .forEach(this::saveFuncionalidade);
    }

    private void saveFuncionalidade(Funcionalidade funcionalidade) {
        funcionalidadeRepository.save(funcionalidade);
    }
}

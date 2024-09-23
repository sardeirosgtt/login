package com.sardeiro.login.seguranca;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.sardeiro.login.domain.Usuario;


@Service
public class TokenService {

    @Value("${api.security.token.secret}")
    private String secret;

    public String generateToken(Usuario usuario) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);

            // Extraindo as funcionalidades do perfil do usuário
            List<String> authorities = usuario.getPerfil().getFuncionalidades().stream()
                    .map(funcionalidade -> funcionalidade.getNome())
                    .collect(Collectors.toList());

            String token = JWT.create()
                    .withIssuer("pousada")
                    .withSubject(usuario.getEmail())
                    .withClaim("authorities", authorities)  // Adicionando as funcionalidades no token
                    .withExpiresAt(genExpirationDate())
                    .sign(algorithm);

            return token;
        } catch (JWTCreationException e) {
            throw new RuntimeException("Erro ao gerar o Token", e);
        }
    }

    public String generateTemporaryToken(Usuario usuario) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);

            // Extraindo as funcionalidades do perfil do usuário
            List<String> authorities = usuario.getPerfil().getFuncionalidades().stream()
                    .map(funcionalidade -> funcionalidade.getNome())
                    .collect(Collectors.toList());

            String token = JWT.create()
                    .withIssuer("pousada")
                    .withSubject(usuario.getEmail())
                    .withClaim("authorities", authorities) 
                    .withExpiresAt(genExpirationDateTemp())
                    .sign(algorithm);

            return token;
        } catch (JWTCreationException e) {
            throw new RuntimeException("Erro ao gerar o Token", e);
        }
    }

    public String validateToken(String token) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);
            return JWT.require(algorithm)
                    .withIssuer("pousada")
                    .build()
                    .verify(token)
                    .getSubject();
        } catch (JWTCreationException e) {
            return "";
        }
    }

    public String getEmailFromToken(String token) {
        try {
            DecodedJWT decodedJWT = JWT.decode(token);
            return decodedJWT.getSubject();
        } catch (Exception e) {
            return null;
        }
    }

    public List<String> getAuthoritiesFromToken(String token) {
        try {
            DecodedJWT decodedJWT = JWT.decode(token);
            return decodedJWT.getClaim("authorities").asList(String.class);
        } catch (Exception e) {
            return null;
        }
    }

    private Instant genExpirationDate() {
        return LocalDateTime.now().plusHours(8).toInstant(ZoneOffset.of("-03:00"));
    }

    private Instant genExpirationDateTemp() {
        return LocalDateTime.now().plusMinutes(5).toInstant(ZoneOffset.of("-03:00"));
    }
}

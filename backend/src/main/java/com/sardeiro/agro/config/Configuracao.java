package com.sardeiro.agro.config;

import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.Point;
import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.sardeiro.agro.domain.Fazenda;
import com.sardeiro.agro.dtos.fazenda.FazendaDTO;
import com.sardeiro.agro.dtos.fazenda.FazendaListDTO;

@Configuration
public class Configuracao {

    private final GeometryFactory geometryFactory = new GeometryFactory();

    @Bean
    public ModelMapper obterModelMapper() {
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

        // Converter Point -> Latitude/Longitude
        Converter<Point, Double> pointToLatitude = ctx -> ctx.getSource() != null ? ctx.getSource().getY() : null;
        Converter<Point, Double> pointToLongitude = ctx -> ctx.getSource() != null ? ctx.getSource().getX() : null;

        modelMapper.typeMap(Fazenda.class, FazendaDTO.class)
                .addMappings(mapper -> {
                    mapper.using(pointToLatitude).map(Fazenda::getLocalizacao, FazendaDTO::setLatitude);
                    mapper.using(pointToLongitude).map(Fazenda::getLocalizacao, FazendaDTO::setLongitude);
                    mapper.map(src -> src.getDono().getId(), FazendaDTO::setDonoId);
                });

        modelMapper.typeMap(Fazenda.class, FazendaListDTO.class)
                .addMappings(mapper -> {
                    mapper.using(pointToLatitude).map(Fazenda::getLocalizacao, FazendaListDTO::setLatitude);
                    mapper.using(pointToLongitude).map(Fazenda::getLocalizacao, FazendaListDTO::setLongitude);
                });        

        // Converter Latitude/Longitude -> Point
        Converter<FazendaDTO, Point> latLngToPoint = ctx -> {
            FazendaDTO dto = ctx.getSource();
            return (dto.getLatitude() != null && dto.getLongitude() != null) ?
                    geometryFactory.createPoint(new Coordinate(dto.getLongitude(), dto.getLatitude())) :
                    null;
        };

        modelMapper.typeMap(FazendaDTO.class, Fazenda.class)
                .addMappings(mapper -> {
                    mapper.using(latLngToPoint).map(src -> src, Fazenda::setLocalizacao);
                });

        return modelMapper;
    }
}

package org.example.mappers;

import org.example.dtos.BrandDTO;
import org.example.dtos.ModelDTO;
import org.example.entities.Brand;
import org.example.entities.Model;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ModelMapper {
    Model toModel(ModelDTO dto);
    ModelDTO toModelDto(Model model);
    List<ModelDTO> toModelDtos(List<Model> models);
    List<Model> toModels(List<ModelDTO> modelDtos);
    BrandDTO toBrandDto(Brand brand);
}

package org.example.mappers;

import org.example.dtos.BrandDTO;
import org.example.entities.Brand;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface BrandMapper {
    Brand toBrand(BrandDTO dto);
    BrandDTO toBrandDto(Brand brand);
    List<BrandDTO> toBrandDtos(List<Brand> brands);
    List<Brand> toBrands(List<BrandDTO> brandsDtos);
}

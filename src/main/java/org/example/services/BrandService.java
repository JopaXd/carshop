package org.example.services;

import lombok.RequiredArgsConstructor;
import org.example.dtos.BrandDTO;
import org.example.mappers.BrandMapper;
import org.example.repositories.BrandRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BrandService {

    private final BrandRepository brandRepository;
    private final BrandMapper brandMapper;

    public List<BrandDTO> allBrands() {
        return brandMapper.toBrandDtos(brandRepository.findAll());
    }
}

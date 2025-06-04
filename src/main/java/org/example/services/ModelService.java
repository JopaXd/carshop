package org.example.services;

import lombok.RequiredArgsConstructor;
import org.example.dtos.ModelDTO;
import org.example.mappers.ModelMapper;
import org.example.repositories.BrandRepository;
import org.example.repositories.ModelRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ModelService {

    private final ModelRepository modelRepository;
    private final ModelMapper modelMapper;

    public List<ModelDTO> allModels() {
        return modelMapper.toModelDtos(modelRepository.findAll());
    }
}

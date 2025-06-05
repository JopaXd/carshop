package org.example.controllers;

import lombok.RequiredArgsConstructor;
import org.example.dtos.ModelDTO;
import org.example.services.ModelService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class ModelController {
    private final ModelService modelService;

    @GetMapping("/models")
    public ResponseEntity<List<ModelDTO>> allModels() {
        return ResponseEntity.ok(modelService.allModels());
    }

    @GetMapping("/models/brand/{brandId}")
    public ResponseEntity<List<ModelDTO>> getModelsByBrand(@PathVariable Integer brandId) {
        return ResponseEntity.ok(modelService.getModelsByBrandId(brandId));
    }

}

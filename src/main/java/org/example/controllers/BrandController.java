package org.example.controllers;

import lombok.RequiredArgsConstructor;
import org.example.dtos.BrandDTO;
import org.example.entities.Brand;
import org.example.services.BrandService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class BrandController {
    private final BrandService brandService;

    @GetMapping("/brands")
    public ResponseEntity<List<BrandDTO>> allBrands() {
        return ResponseEntity.ok(brandService.allBrands());
    }
}

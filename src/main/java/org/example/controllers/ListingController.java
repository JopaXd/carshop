package org.example.controllers;

import lombok.RequiredArgsConstructor;
import org.example.dtos.ListingDTO;
import org.example.services.ListingService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class ListingController {
    private final ListingService listingService;

    @GetMapping("/listings")
    public ResponseEntity<List<ListingDTO>> allListings() {
        return ResponseEntity.ok(listingService.allListings());
    }
}

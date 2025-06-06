package org.example.controllers;

import lombok.RequiredArgsConstructor;
import org.example.dtos.CreateListingDTO;
import org.example.dtos.ListingDTO;
import org.example.services.ListingService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class ListingController {
    private final ListingService listingService;

    @GetMapping("/listings")
    public ResponseEntity<List<ListingDTO>> allListings() {
        return ResponseEntity.ok(listingService.allListings());
    }

    @PostMapping("/listings")
    public ResponseEntity<ListingDTO> createListing(@RequestBody CreateListingDTO createDto) {
        ListingDTO createdListingRecord = listingService.createListing(createDto);
        return ResponseEntity.created(URI.create("/listings/" + createdListingRecord.getId())).body(createdListingRecord);
    }

    @DeleteMapping("/listings/{id}")
    public ResponseEntity<ListingDTO> deleteListing(@PathVariable Integer id) {
        return ResponseEntity.ok(listingService.deleteListing(id));
    }
}

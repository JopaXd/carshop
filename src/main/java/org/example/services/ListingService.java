package org.example.services;

import lombok.RequiredArgsConstructor;
import org.example.dtos.ListingDTO;
import org.example.mappers.ListingMapper;
import org.example.repositories.ListingRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ListingService {

    private final ListingRepository listingRepository;
    private final ListingMapper listingMapper;

    public List<ListingDTO> allListings() {
        return listingMapper.toListingDtos(listingRepository.findAll());
    }
}

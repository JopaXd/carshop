package org.example.services;

import lombok.RequiredArgsConstructor;
import org.example.dtos.CreateListingDTO;
import org.example.dtos.ListingDTO;
import org.example.entities.Brand;
import org.example.entities.Listing;
import org.example.entities.Model;
import org.example.mappers.ListingMapper;
import org.example.repositories.BrandRepository;
import org.example.repositories.ListingRepository;
import org.example.repositories.ModelRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ListingService {

    private final ListingRepository listingRepository;
    private final BrandRepository brandRepository;
    private final ModelRepository modelRepository;
    private final ListingMapper listingMapper;

    public List<ListingDTO> allListings() {
        return listingMapper.toListingDtos(listingRepository.findAll());
    }

    public ListingDTO createListing(CreateListingDTO createDto) {
        Brand brand = brandRepository.findById(createDto.getBrand())
            .orElseThrow(() -> new IllegalArgumentException("Brand not found"));
        Model model = modelRepository.findById(createDto.getModel())
            .orElseThrow(() -> new IllegalArgumentException("Model not found"));

        Listing listing = new Listing();
        listing.setBrand(brand);
        listing.setModel(model);
        listing.setYear(createDto.getYear());
        listing.setMileage(createDto.getMileage());
        listing.setPrice(createDto.getPrice());
        listing.setDescription(createDto.getDescription());
        listing.setImage(createDto.getImage());
        listing.setIsSold(createDto.getIsSold());
        Listing saved = listingRepository.save(listing);
        return listingMapper.toListingDto(saved);
    }
}

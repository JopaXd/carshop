package org.example.services;

import lombok.RequiredArgsConstructor;
import org.example.dtos.CreateListingDTO;
import org.example.dtos.EditListingDTO;
import org.example.dtos.ListingDTO;
import org.example.entities.Brand;
import org.example.entities.Listing;
import org.example.entities.Model;
import org.example.exceptions.AppException;
import org.example.mappers.ListingMapper;
import org.example.repositories.BrandRepository;
import org.example.repositories.ListingRepository;
import org.example.repositories.ModelRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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

    public ListingDTO deleteListing(Integer id) {
        Listing listing = listingRepository.findById(id).orElseThrow(() -> new AppException("Listing not found!", HttpStatus.NOT_FOUND));

        ListingDTO listingDTO = listingMapper.toListingDto(listing);
        listingRepository.deleteById(id);

        return listingDTO;
    }

    public ListingDTO getListingById(Integer id) {
        // Assuming your repository returns an Optional<Listing>
        Listing listing = listingRepository.findById(id).orElseThrow(() -> new AppException("Listing not found!", HttpStatus.NOT_FOUND));
        ListingDTO listingDTO = listingMapper.toListingDto(listing);
        return listingDTO;
    }

    public ListingDTO editListing(Integer id, EditListingDTO editListingDto) {
        Listing listing = listingRepository.findById(id).orElseThrow(() -> new AppException("Listing not found!", HttpStatus.NOT_FOUND));
        listingMapper.updateListing(listing, editListingDto);
        Listing savedListing = listingRepository.save(listing);
        return listingMapper.toListingDto(savedListing);
    }
}

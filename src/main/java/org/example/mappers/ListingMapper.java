package org.example.mappers;

import org.example.dtos.BrandDTO;
import org.example.dtos.ListingDTO;
import org.example.dtos.ModelDTO;
import org.example.entities.Brand;
import org.example.entities.Listing;
import org.example.entities.Model;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ListingMapper {
    Listing toListing(ListingDTO dto);
    ListingDTO toListingDto(Listing listing);
    List<ListingDTO> toListingDtos(List<Listing> listings);
    List<Listing> toListings(List<ListingDTO> listingDtos);
    BrandDTO toBrandDto(Brand brand);
    ModelDTO toModelDto(Model model);
}

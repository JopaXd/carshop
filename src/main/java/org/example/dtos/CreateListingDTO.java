package org.example.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class CreateListingDTO {
    private Integer brand; // just the brand ID
    private Integer model; // just the model ID
    private Integer year;
    private Integer mileage;
    private Double price;
    private String description;
    private String image;
    private Boolean isSold = false;
}

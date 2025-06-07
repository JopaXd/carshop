import type Listing from "@/types/Listing";

export default interface ListingProps {
  listing: Listing;
  deleteMethod: Function;
  editMethod: Function;
}

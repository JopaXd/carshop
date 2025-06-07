import ClipLoader from "react-spinners/ClipLoader";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ListingCard from "@/components/ListingCard";
import { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  // State to manage listings
  const [listings, setListings] = useState([]);
  const navigate = useNavigate();

  const listingsQuery = useQuery({
    queryKey: ["listings"],
    queryFn: fetchListings,
  });

  async function fetchListings() {
    return await axios
      .get("http://localhost:8080/listings")
      .then((response: any) => {
        setListings(response.data);
        return response.data;
      })
      .catch((error) => {
        console.error("Error fetching listings:", error);
        return [];
      });
  }

  async function deleteListing(id: string) {
    return await axios
      .delete(`http://localhost:8080/listings/${id}`)
      .then(() => {
        setListings((prevListings) =>
          prevListings.filter((listing) => listing.id !== id),
        );
        toast.success("Item successfully deleted!");
      })
      .catch((error) => {
        console.error("Error deleting listing:", error);
      });
  }

  function editListing(id: string) {
    navigate({ to: `/edit/${id}` });
  }

  return (
    <div className="p-12">
      {listingsQuery.isPending ? (
        <div className="flex justify-center items-center">
          <ClipLoader color="#36d7b7" size={50} />
        </div>
      ) : (
        // Show a message in the center saying there is no data if that is the case
        <>
          <div className="text-center mb-8">
            {listings.length === 0 ? (
              <p className="text-gray-500">No listings available.</p>
            ) : (
              <h1 className="text-2xl font-bold mb-4">Available Listings</h1>
            )}
          </div>
          <div className="flex flex-wrap gap-8 justify-center">
            {listings.map((listing, idx) => (
              <ListingCard
                key={idx}
                listing={listing}
                deleteMethod={deleteListing}
                editMethod={editListing}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

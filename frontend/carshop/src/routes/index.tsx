import ClipLoader from "react-spinners/ClipLoader";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ListingCard from "@/components/ListingCard";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { data, isPending } = useQuery({
    queryKey: ["listings"],
    queryFn: fetchListings,
  });

  async function fetchListings() {
    return await axios
      .get("http://localhost:8080/listings")
      .then((response: any) => response.data);
  }

  return (
    <div className="p-12">
      {isPending ? (
        <div className="flex justify-center items-center">
          <ClipLoader color="#36d7b7" size={50} />
        </div>
      ) : (
        <div className="flex flex-wrap gap-8 justify-center">
          {data.map((listing, idx) => (
            <ListingCard key={idx} listing={listing} />
          ))}
        </div>
      )}
    </div>
  );
}

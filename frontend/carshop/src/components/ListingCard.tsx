import React from "react";
import type ListingProps from "@/types/ListingProps";
import {
  CarFront,
  Calendar,
  Gauge,
  DollarSign,
  MapPin,
  CheckCircle,
  XCircle,
  Edit,
  Trash,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ListingCard: React.FC<ListingProps> = ({
  listing,
  deleteMethod,
  editMethod,
}) => (
  <Card className="max-w-sm w-full shadow-lg border border-gray-200">
    <CardHeader className="flex flex-row items-center gap-3">
      <CarFront className="w-8 h-8 text-primary" />
      <div>
        <CardTitle className="text-xl">
          {listing.brand.name} {listing.model.name}
        </CardTitle>
        <CardDescription className="flex items-center gap-1">
          <Calendar className="w-4 h-4" /> {listing.year}
        </CardDescription>
      </div>
    </CardHeader>
    <CardContent className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <Gauge className="w-4 h-4 text-muted-foreground" />
        <span>{listing.mileage.toLocaleString()} km</span>
      </div>
      <div className="flex items-center gap-2">
        <DollarSign className="w-4 h-4 text-muted-foreground" />
        <span className="font-semibold">${listing.price.toLocaleString()}</span>
      </div>
      <div className="flex items-center gap-2">
        <MapPin className="w-4 h-4 text-muted-foreground" />
        <span>{listing.brand.country}</span>
      </div>
      <div className="flex items-center gap-2">
        {listing.isSold ? (
          <>
            <XCircle className="w-4 h-4 text-red-500" />
            <span className="text-red-500 font-semibold">Sold</span>
          </>
        ) : (
          <>
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span className="text-green-600 font-semibold">Available</span>
          </>
        )}
      </div>
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Calendar className="w-4 h-4" />
        <span>
          Updated on {new Date(listing.updatedAt).toLocaleDateString()}
        </span>
      </div>
      <div className="text-sm text-muted-foreground">{listing.description}</div>
    </CardContent>
    <CardFooter className="block">
      {listing.image && (
        <img
          src={`${listing.image}`}
          alt={`${listing.brand.name} ${listing.model.name}`}
          className="rounded-lg mt-2 object-cover w-full h-48 border"
        />
      )}
      <div className="flex flex-col mt-4 space-y-2">
        <Button
          size="sm"
          className="w-full flex items-center"
          onClick={() => editMethod(listing.id)}
        >
          <Edit className="mr-2 h-4 w-4" />
          Edit
        </Button>
        <Button
          variant="destructive"
          size="sm"
          className="w-full flex items-center"
          onClick={() => deleteMethod(listing.id)}
        >
          <Trash className="mr-2 h-4 w-4" />
          Delete
        </Button>
      </div>
    </CardFooter>
  </Card>
);

export default ListingCard;

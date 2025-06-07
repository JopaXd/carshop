import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createFileRoute } from "@tanstack/react-router";
import ClipLoader from "react-spinners/ClipLoader";
import { useQuery } from "@tanstack/react-query";
import { Calendar, Pencil, Gauge } from "lucide-react";
import { useForm } from "@tanstack/react-form";
import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import axios from "axios";

export const Route = createFileRoute("/edit/$listingId")({
  component: EditListingComponent,
});

function EditListingComponent() {
  const { listingId } = Route.useParams();
  const navigation = useNavigate();

  const editListingForm = useForm({
    defaultValues: {
      price: 0,
      description: "",
      isSold: false,
    },
    onSubmit: async ({ value }) => {
      try {
        await axios.put(`http://localhost:8080/listings/${listingId}`, {
          price: value.price,
          description: value.description,
          isSold: value.isSold,
        });
        navigation({ to: "/" });
      } catch (error) {
        console.error("Error updating listing:", error);
      }
    },
  });

  // Fetch using tanstack query
  const listingQuery = useQuery({
    queryKey: ["listing", listingId],
    queryFn: async () => {
      const response = await axios.get(
        `http://localhost:8080/listings/${listingId}`,
      );
      editListingForm.setFieldValue("price", response.data.price);
      editListingForm.setFieldValue("description", response.data.description);
      editListingForm.setFieldValue("isSold", response.data.isSold);
      return response.data;
    },
  });

  return (
    <div className="p-6 md:p-12">
      {listingQuery.isPending && (
        <div className="flex justify-center items-center h-80">
          <ClipLoader color="#36d7b7" size={50} />
        </div>
      )}

      {listingQuery.isError && (
        <div className="text-red-500 text-center text-lg font-semibold">
          Error fetching listing data.
        </div>
      )}

      {!listingQuery.isPending &&
        !listingQuery.isError &&
        listingQuery.data && (
          <Card className="max-w-lg mx-auto shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl ml-auto mr-auto flex flex-wrap items-center gap-2">
                {listingQuery.data.brand.name}
                <span className="font-light">-</span>
                {listingQuery.data.model.name}
                <span className="font-semibold ml-1">
                  {listingQuery.data.year}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <img
                src={listingQuery.data.image}
                alt={`${listingQuery.data.model.name} image`}
                className="rounded-lg mb-4 object-cover shadow-lg"
                style={{ maxHeight: "16rem", width: "auto", maxWidth: "100%" }}
              />
              <div className="flex space-x-4 mb-2 text-gray-500 mt-2 text-sm">
                <span className="flex items-center">
                  <Calendar className="mr-1 h-4 w-4" />
                  Created:{" "}
                  {new Date(listingQuery.data.createdAt).toLocaleDateString()}
                </span>
                <span className="flex items-center">
                  <Pencil className="mr-1 h-4 w-4" />
                  Updated:{" "}
                  {new Date(listingQuery.data.updatedAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-500 mb-2">
                <Gauge className="h-5 w-5" />
                <span className="font-semibold">
                  {listingQuery.data.mileage.toLocaleString()} km
                </span>
              </div>
            </CardContent>
          </Card>
        )}
      <form
        className="mt-8 max-w-lg mx-auto"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <editListingForm.Field
          validators={{
            onSubmit: (field) => {
              if (!field.value || field.value < 0) {
                return "Price must be a valid number greater than 0.";
              }
            },
          }}
          name="price"
          children={(field) => (
            <div>
              <Label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700"
              >
                Price ($)
              </Label>
              <Input
                id="price"
                type="number"
                name="price"
                className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
                value={field.state.value}
                onChange={(e) => {
                  field.handleChange(parseInt(e.target.value));
                }}
              />
              {field.state.meta.errors && (
                <p className="text-red-500 text-sm mt-1">
                  {field.state.meta.errors}
                </p>
              )}
            </div>
          )}
        ></editListingForm.Field>
        <editListingForm.Field
          validators={{
            onSubmit: (field) => {
              if (!field.value) {
                return "Description is required.";
              }
            },
          }}
          name="description"
          children={(field) => (
            <div>
              <Label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </Label>
              <Input
                id="description"
                type="text"
                name="description"
                className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
                value={field.state.value}
                onChange={(e) => {
                  field.handleChange(e.target.value);
                }}
              />
              {field.state.meta.errors && (
                <p className="text-red-500 text-sm mt-1">
                  {field.state.meta.errors}
                </p>
              )}
            </div>
          )}
        ></editListingForm.Field>
        <editListingForm.Field
          name="isSold"
          children={(field) => (
            <div className="flex justify-center mt-10">
              <Checkbox
                className="mt-0.5"
                id="isSold"
                name="isSold"
                checked={field.state.value}
                onCheckedChange={(e) => {
                  field.handleChange(e);
                }}
              />
              <div className="m-4"></div>
              <Label
                htmlFor="isSold"
                className="block text-sm font-medium text-gray-700"
              >
                Is car sold?
              </Label>
            </div>
          )}
        ></editListingForm.Field>
      </form>
      <div className="spacer mt-5" />
      <div className="mt-8 max-w-lg mx-auto">
        <div className="text-center">
          <Button
            onClick={editListingForm.handleSubmit}
            className="px-4 py-2 text-center"
          >
            Overwrite Listing
          </Button>
        </div>
      </div>
    </div>
  );
}

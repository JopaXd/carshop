import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import ClipLoader from "react-spinners/ClipLoader";
import axios from "axios";
import { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useForm } from "@tanstack/react-form";

export const Route = createFileRoute("/create")({
  component: Create,
});

function Create() {
  const navigation = useNavigate();

  const listingForm = useForm({
    defaultValues: {
      brand: "",
      model: "",
      year: 0,
      mileage: 0,
      price: 0,
      description: "",
      image: "null",
    },
    onSubmit: async ({ value }) => {
      value["brand"] = parseInt(value.brand);
      value["model"] = parseInt(value.model);
      value["isSold"] = false;

      // Convert file to base64 if needed
      if (!value.image || value.image === "null") {
        value["image"] = null;
      } else {
        value["image"] = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = (error) => reject(error);
          reader.readAsDataURL(value.image);
        });
      }

      try {
        await axios.post("http://localhost:8080/listings", value);
        navigation({ to: "/" });
      } catch (error) {
        console.error("Error creating listing:", error);
      }
    },
  });

  const brandQuery = useQuery({
    queryKey: ["brands"],
    queryFn: fetchBrands,
  });

  const modelsQuery = useQuery({
    queryKey: ["models", listingForm.state.values.brand],
    queryFn: () => fetchModels(listingForm.state.values.brand),
    enabled: !!listingForm.state.values.brand,
  });

  useEffect(() => {
    if (modelsQuery.data && modelsQuery.data.length > 0) {
      listingForm.setFieldValue("model", String(modelsQuery.data[0].id));
    }
  }, [modelsQuery.data]);

  async function fetchBrands() {
    const response = await axios.get("http://localhost:8080/brands");
    //  convert brand id to string and set it
    listingForm.setFieldValue("brand", String(response.data[0].id));
    return response.data;
  }

  async function fetchModels(brandId: string) {
    const response = await axios.get(
      `http://localhost:8080/models/brand/${brandId}`,
    );
    return response.data;
  }

  return (
    // Create listing form
    <div className="p-12 ml-80 mr-80 mt-30">
      <h1 className="text-center text-2xl font-bold mb-4">Create Listing</h1>
      {brandQuery.isPending ? (
        <div className="flex justify-center items-center">
          <ClipLoader color="#36d7b7" size={50} />
        </div>
      ) : (
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <listingForm.Field
            name="brand"
            validators={{
              onSubmit: (field) => {
                if (!field.value) {
                  return "Brand is required";
                }
              },
            }}
            children={(field) => (
              <div>
                <Label
                  htmlFor="brand"
                  className="block text-sm font-medium text-gray-700"
                >
                  Brand
                </Label>
                <Select
                  value={field.state.value}
                  onValueChange={(e) => {
                    field.handleChange(e);
                    modelsQuery.refetch();
                  }}
                >
                  <SelectTrigger
                    id="brand"
                    className="w-full mt-1 p-2 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  >
                    <SelectValue placeholder="Select a brand" />
                  </SelectTrigger>
                  <SelectContent>
                    {brandQuery.data?.map((brand: any) => (
                      <SelectItem key={brand.id} value={String(brand.id)}>
                        {brand.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {field.state.meta.errors && (
                  <p className="text-red-500 text-sm mt-1">
                    {field.state.meta.errors}
                  </p>
                )}
              </div>
            )}
          ></listingForm.Field>
          <listingForm.Field
            name="model"
            validators={{
              onSubmit: (field) => {
                if (!field.value) {
                  return "Model is required";
                }
              },
            }}
            children={(field) => (
              <div>
                <Label
                  htmlFor="model"
                  className="block text-sm font-medium text-gray-700"
                >
                  Model
                </Label>
                <Select
                  value={field.state.value}
                  onValueChange={(e) => {
                    field.handleChange(e);
                  }}
                >
                  <SelectTrigger id="model" className="w-full">
                    <SelectValue
                      placeholder={
                        modelsQuery.isPending
                          ? "Loading models..."
                          : "Select a model"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {modelsQuery.isPending ? (
                      <SelectItem value="0" disabled>
                        Loading models...
                      </SelectItem>
                    ) : modelsQuery.data && modelsQuery.data.length > 0 ? (
                      modelsQuery.data.map((model: any) => (
                        <SelectItem key={model.id} value={String(model.id)}>
                          {model.name}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value="0" disabled>
                        No models found
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
                {field.state.meta.errors && (
                  <p className="text-red-500 text-sm mt-1">
                    {field.state.meta.errors}
                  </p>
                )}
              </div>
            )}
          ></listingForm.Field>
          <listingForm.Field
            validators={{
              onSubmit: (field) => {
                if (!field.value || field.value <= 0) {
                  return "Year must be a valid number greater than 0";
                }
              },
            }}
            name="year"
            children={(field) => (
              <div>
                <Label
                  htmlFor="year"
                  className="block text-sm font-medium text-gray-700"
                >
                  Year
                </Label>
                <Input
                  id="year"
                  type="number"
                  name="year"
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
          ></listingForm.Field>
          <listingForm.Field
            validators={{
              onSubmit: (field) => {
                if (!field.value || field.value < 0) {
                  return "Mileage must be a valid number greater or equal to 0.";
                }
              },
            }}
            name="mileage"
            children={(field) => (
              <div>
                <Label
                  htmlFor="mileage"
                  className="block text-sm font-medium text-gray-700"
                >
                  Mileage (km)
                </Label>
                <Input
                  id="mileage"
                  type="number"
                  name="mileage"
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
          ></listingForm.Field>
          <listingForm.Field
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
          ></listingForm.Field>
          <listingForm.Field
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
          ></listingForm.Field>
          <listingForm.Field
            validators={{
              onSubmit: (field) => {
                if (field.value === "null") {
                  return "Image is required.";
                }
              },
            }}
            name="image"
            children={(field) => (
              <div>
                <Label
                  htmlFor="image"
                  className="block text-sm font-medium text-gray-700"
                >
                  Image
                </Label>
                <Input
                  id="image"
                  type="file"
                  name="images"
                  className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  accept="image/*"
                  onChange={(e) => {
                    field.handleChange(e.target.files[0]);
                  }}
                />
                {field.state.meta.errors && (
                  <p className="text-red-500 text-sm mt-1">
                    {field.state.meta.errors}
                  </p>
                )}
              </div>
            )}
          ></listingForm.Field>
        </form>
      )}
      <div className="spacer mt-5" />
      <div className="text-center">
        <Button className="text-center" onClick={listingForm.handleSubmit}>
          Create Listing
        </Button>
      </div>
    </div>
  );
}

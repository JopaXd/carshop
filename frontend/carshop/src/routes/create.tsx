import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import ClipLoader from "react-spinners/ClipLoader";
import axios from "axios";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"; // Adjust import path as needed

export const Route = createFileRoute("/create")({
  component: Create,
});

function Create() {
  const [brandId, setBrandId] = useState<number>(0);

  const brandQuery = useQuery({
    queryKey: ["brands"],
    queryFn: fetchBrands,
  });

  const modelsQuery = useQuery({
    queryKey: ["models", brandId],
    queryFn: () => fetchModels(brandId),
    enabled: !!brandId,
  });

  const [selectedModel, setSelectedModel] = useState<string | undefined>();

  useEffect(() => {
    if (
      modelsQuery.data &&
      modelsQuery.data.length > 0 &&
      (selectedModel === undefined ||
        !modelsQuery.data.find((m) => String(m.id) === selectedModel))
    ) {
      setSelectedModel(String(modelsQuery.data[0].id));
    }
  }, [modelsQuery.data]);

  async function fetchBrands() {
    const response = await axios.get("http://localhost:8080/brands");
    setBrandId(response.data[0]?.id || 0);
    return response.data;
  }

  async function fetchModels(brandId: number) {
    const response = await axios.get(
      `http://localhost:8080/models/brand/${brandId}`,
    );
    return response.data;
  }

  const selectBrand = (brandId: number) => {
    setBrandId(brandId);
  };

  return (
    // Create listing form
    <div className="p-12 ml-80 mr-80 mt-30">
      <h1 className="text-center text-2xl font-bold mb-4">Create Listing</h1>
      {brandQuery.isPending ? (
        <div className="flex justify-center items-center">
          <ClipLoader color="#36d7b7" size={50} />
        </div>
      ) : (
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Brand
            </label>
            <Select
              value={String(brandId)}
              onValueChange={(value) => {
                const selectedBrandId = parseInt(value);
                selectBrand(selectedBrandId);
              }}
            >
              <SelectTrigger className="w-full mt-1 p-2 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
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
          </div>
          {/* Additional form fields for listing details */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Model
            </label>
            <Select value={selectedModel} onValueChange={setSelectedModel}>
              <SelectTrigger className="w-full">
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
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Year
            </label>
            <Input
              type="number"
              name="year"
              className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Mileage (km)
            </label>
            <Input
              type="number"
              name="mileage"
              className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Price ($)
            </label>
            <Input
              type="number"
              name="price"
              className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <Input
              type="text"
              name="description"
              className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Create Listing
          </button>
        </form>
      )}
    </div>
  );
}

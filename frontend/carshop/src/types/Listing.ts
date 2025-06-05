import type { Brand } from "./Brand";
import type { Model } from "./Model";

export default interface Car {
  brand: Brand;
  model: Model;
  year: number;
  mileage: number;
  price: number;
  description: string;
  createdAt: string;
  updatedAt: string;
  image: string; // base64 image
  isSold: boolean;
}

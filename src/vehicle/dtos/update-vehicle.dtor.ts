export class UpdateVehicleDto {
  name: string;
  brand: string;
  model: string;
  image: string;
  price: number;
  description: string;
  additionalInformations: { key: string; value: string }[];
}

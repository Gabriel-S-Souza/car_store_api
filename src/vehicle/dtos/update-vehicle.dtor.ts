import { ApiProperty } from '@nestjs/swagger';

export class UpdateVehicleDto {
  @ApiProperty({ type: String })
  name: string;

  @ApiProperty({ type: String })
  brand: string;

  @ApiProperty({ type: String })
  model: string;

  @ApiProperty({ type: String })
  image: string;

  @ApiProperty({ type: Number, default: 100000 })
  price: number;

  @ApiProperty({ type: String })
  description: string;

  @ApiProperty({ type: Array, default: [{ key: 'key', value: 'value' }] })
  additionalInformations: { key: string; value: string }[];
}

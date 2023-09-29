import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsArray,
  ArrayNotEmpty,
} from 'class-validator';

export class CreateVehicleDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String })
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String })
  brand: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String })
  model: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, default: 'imageBase64' })
  image: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ type: Number, default: 100000 })
  price: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String })
  description: string;

  @IsArray()
  @ArrayNotEmpty()
  @ApiProperty({ type: Array, default: [{ key: 'key', value: 'value' }] })
  additionalInformations: { key: string; value: string }[];
}

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ErrorHelper } from 'src/helpers/error.helper';
import { IsYearValid } from './create-vehicle.dto';

export class UpdateVehicleDto {
  @IsOptional()
  @IsString({ message: ErrorHelper.INVALID_FIELD })
  @IsNotEmpty({ message: ErrorHelper.INVALID_FIELD })
  @ApiProperty({ type: String })
  name: string;

  @IsOptional()
  @IsString({ message: ErrorHelper.INVALID_FIELD })
  @ApiProperty({ type: String })
  brand: string;

  @IsOptional()
  @IsString({ message: ErrorHelper.INVALID_FIELD })
  @ApiProperty({ type: String })
  model: string;

  @IsOptional()
  @IsString({ message: ErrorHelper.INVALID_FIELD })
  @ApiProperty({ type: String })
  image: string;

  @IsOptional()
  @IsNumber({ allowNaN: false }, { message: ErrorHelper.INVALID_FIELD })
  @ApiProperty({ type: Number, default: 100000 })
  price: number;

  @IsOptional()
  @IsString({ message: ErrorHelper.INVALID_FIELD })
  @ApiProperty({ type: String })
  description: string;

  @IsOptional()
  @IsString({ message: ErrorHelper.INVALID_FIELD })
  @ApiProperty({ type: String })
  condition: string;

  @IsOptional()
  @IsNumber({ allowNaN: false }, { message: ErrorHelper.INVALID_FIELD })
  @IsYearValid()
  @ApiProperty({ type: Number })
  year: number;

  @IsOptional()
  @IsNumber({ allowNaN: false }, { message: ErrorHelper.INVALID_FIELD })
  @ApiProperty({ type: Number })
  mileage: number;

  @IsOptional()
  engine: string;
}

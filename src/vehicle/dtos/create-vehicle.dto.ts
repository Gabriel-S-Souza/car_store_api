import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsArray,
  ArrayNotEmpty,
  ValidateBy,
  ValidationOptions,
  buildMessage,
} from 'class-validator';
import { ConditionEnum } from '../vehicle.entity';
import { ErrorHelper } from 'src/helpers/error.helper';

export class CreateVehicleDto {
  @IsNotEmpty({ message: ErrorHelper.MISSING_FIELD })
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

  @IsNotEmpty({ message: ErrorHelper.MISSING_FIELD })
  @IsNumber({ allowNaN: false }, { message: ErrorHelper.INVALID_FIELD })
  @ApiProperty({ type: Number })
  mileage: number;

  @IsNotEmpty({ message: ErrorHelper.MISSING_FIELD })
  @IsNumber({ allowNaN: false }, { message: ErrorHelper.INVALID_FIELD })
  @IsYearValid()
  @ApiProperty({ type: Number })
  year: number;

  @IsNotEmpty({ message: ErrorHelper.MISSING_FIELD })
  @IsString({ message: ErrorHelper.INVALID_FIELD })
  @ApiProperty({ type: String })
  condition: ConditionEnum;

  @IsArray()
  @ArrayNotEmpty()
  @ApiProperty({ type: Array, default: [{ key: 'key', value: 'value' }] })
  additionalInformations: { key: string; value: string }[];
}

export function IsYearValid(validationOptions?: ValidationOptions) {
  return ValidateBy(
    {
      name: 'isYearValid',
      validator: {
        validate(value) {
          const currentYear = new Date().getFullYear();
          return value <= currentYear;
        },
        defaultMessage: buildMessage(
          () => `O ano do veículo não pode ser maior que o ano atual.`,
          validationOptions,
        ),
      },
    },
    validationOptions,
  );
}

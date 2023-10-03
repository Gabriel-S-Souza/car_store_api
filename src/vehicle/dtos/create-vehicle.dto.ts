import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  ValidateBy,
  ValidationOptions,
  buildMessage,
  IsOptional,
} from 'class-validator';
import { ConditionEnum } from '../vehicle.entity';
import { ErrorHelper } from 'src/helpers/error.helper';

export class CreateVehicleDto {
  @ApiProperty({ type: String })
  @IsOptional()
  engine: string;

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

  @IsOptional()
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
}

export function IsYearValid(validationOptions?: ValidationOptions) {
  return ValidateBy(
    {
      name: 'isYearValid',
      validator: {
        validate(value) {
          const currentYear = new Date().getFullYear();
          return value <= currentYear && value > 1800;
        },
        defaultMessage: buildMessage(
          () => `O ano não pode ser usado. Verifique o ano informado`,
          validationOptions,
        ),
      },
    },
    validationOptions,
  );
}

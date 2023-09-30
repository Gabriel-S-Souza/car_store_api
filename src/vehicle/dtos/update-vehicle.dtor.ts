import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateBy,
  ValidationOptions,
  buildMessage,
  isObject,
  isString,
} from 'class-validator';
import { ErrorHelper } from 'src/helpers/error.helper';

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
  @IsArrayOfKeyValueObjects()
  @ApiProperty({ type: Array, default: [{ key: 'key', value: 'value' }] })
  additionalInformations: { key: string; value: string }[];
}

function IsArrayOfKeyValueObjects(validationOptions?: ValidationOptions) {
  return ValidateBy(
    {
      name: 'isArrayOfKeyValueObjects',
      validator: {
        validate(value) {
          if (!Array.isArray(value)) {
            return false;
          }

          return value.every(
            (item) =>
              isObject(item) &&
              'key' in item &&
              'value' in item &&
              isString(item.key) &&
              isString(item.value),
          );
        },
        defaultMessage: buildMessage(
          (eachPrefix) =>
            eachPrefix + ErrorHelper.INVALID_ADICIONAL_INFORMATION,
          validationOptions,
        ),
      },
    },
    validationOptions,
  );
}

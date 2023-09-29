import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Matches } from 'class-validator';
import { ErrorHelper } from 'src/helpers/error.helper';
import { RegExHelper } from 'src/helpers/regex.helper';

export class LoginDto {
  @IsNotEmpty({ message: ErrorHelper.EMPTY_EMAIL })
  @IsEmail({}, { message: ErrorHelper.INVALID_EMAIL })
  @ApiProperty({ type: String })
  email: string;

  @IsNotEmpty({ message: ErrorHelper.EMPTY_PASSWORD })
  @Matches(RegExHelper.password, { message: ErrorHelper.INVALID_PASSWORD })
  @ApiProperty({ type: String })
  password: string;
}

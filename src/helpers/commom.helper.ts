import { BadRequestException, ValidationPipe } from '@nestjs/common';

export const customValidationPipe = new ValidationPipe({
  whitelist: true,
  forbidNonWhitelisted: true,
  exceptionFactory: (errors) => {
    errors.forEach((error) => {
      if (error.constraints && error.constraints.whitelistValidation) {
        error.constraints.whitelistValidation = `O campo ${error.property} não existe`;
      }
    });

    const errorMessage = errors
      .map((error) => Object.values(error.constraints).join('; '))
      .filter(Boolean)
      .join('; ');

    throw new BadRequestException({
      message: errorMessage,
      statusCode: 400,
      error: 'Validation Error',
    });
  },
});

import { Injectable, ValidationPipe } from '@nestjs/common';
import { UserInputError } from 'apollo-server-express';
import { ValidationError } from 'class-validator';

@Injectable()
export class GqlValidationPipe extends ValidationPipe {
  constructor() {
    super({
      exceptionFactory: (validationErrors) => {
        const errors = this.formatErrors(validationErrors);
        return new UserInputError('Validation error', {
          validationErrors: errors,
        });
      },
    });
  }

  private formatErrors(errors: ValidationError[]) {
    return errors.reduce((acc, err) => {
      if (err.constraints) {
        acc[err.property] = Object.values(err.constraints);
      }

      if (err.children?.length) {
        acc[err.property] = this.formatErrors(err.children);
      }

      return acc;
    }, {});
  }
}

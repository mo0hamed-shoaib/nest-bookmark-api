import {
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { TSchema } from '@sinclair/typebox';
import { Value } from '@sinclair/typebox/value';

// Acts like a guard
export class TypeboxValidationPipe implements PipeTransform {
  constructor(private readonly schema: TSchema) {}

  transform(value: unknown, metadata: ArgumentMetadata) {
    if (metadata.type !== 'body') {
      return value;
    }

    if (Value.Check(this.schema, value)) {
      return Value.Clean(this.schema, value);
    }

    const errors = [...Value.Errors(this.schema, value)].map(
      (e) => `${e.path.substring(1) || 'root'}: ${e.message}`,
    );

    throw new BadRequestException({
      statusCode: 400,
      message: 'Validation failed',
      errors,
    });
  }
}

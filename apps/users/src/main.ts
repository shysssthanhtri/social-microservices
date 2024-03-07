import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { UsersModule } from 'apps/users/src/users.module';

async function bootstrap() {
  const app = await NestFactory.create(UsersModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();

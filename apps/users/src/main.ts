import { NestFactory } from '@nestjs/core';
import { GqlValidationPipe } from 'apps/users/src/pipe/graphql-validation.pipe';
import { UsersModule } from 'apps/users/src/users.module';

async function bootstrap() {
  const app = await NestFactory.create(UsersModule);
  app.useGlobalPipes(new GqlValidationPipe());
  await app.listen(3000);
}
bootstrap();

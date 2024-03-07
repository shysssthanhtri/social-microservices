import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { GqlValidationPipe } from 'apps/common/src/pipe/graphql-validation.pipe';
import { UsersModule } from 'apps/users/src/users.module';

async function bootstrap() {
  const app = await NestFactory.create(UsersModule);
  app.useGlobalPipes(new GqlValidationPipe());

  const configService = app.get(ConfigService);
  const port = configService.get('USERS_PORT');
  await app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/graphql`);
  });
}
bootstrap();

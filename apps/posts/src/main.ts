import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { GqlValidationPipe } from '@shared/shared';
import { PostsModule } from 'apps/posts/src/posts.module';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(PostsModule);
  app.useGlobalPipes(new GqlValidationPipe());

  app.connectMicroservice<MicroserviceOptions>({
    transport: 4,
    options: {
      package: 'PostsService',
      protoPath: join(__dirname, '..', 'proto/posts.proto'),
    },
  });
  await app.startAllMicroservices();

  const configService = app.get(ConfigService);
  const port = configService.get('POSTS_PORT');
  await app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/graphql`);
  });
}
bootstrap();

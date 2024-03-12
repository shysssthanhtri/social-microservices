import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { GqlValidationPipe } from '@shared/shared';
import { POSTS_SERVICE_PACKAGE_NAME } from '@shared/shared/__generated/proto/posts';
import { PostsModule } from 'apps/posts/src/posts.module';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(PostsModule);
  app.useGlobalPipes(new GqlValidationPipe());

  const configService = app.get(ConfigService);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: POSTS_SERVICE_PACKAGE_NAME,
      protoPath: join(__dirname, '..', 'proto/posts.proto'),
      url: `0.0.0.0:${configService.getOrThrow('POSTS_GRPC_PORT')}`,
    },
  });
  await app.startAllMicroservices();

  const port = configService.get('POSTS_PORT');
  await app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/graphql`);
  });
}
bootstrap();

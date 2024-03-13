import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { GqlValidationPipe } from '@shared/shared';
import { RabbitMQQueues } from '@shared/shared/rabbitmq/queues';
import { PostsModule } from 'apps/posts/src/posts.module';

async function bootstrap() {
  const app = await NestFactory.create(PostsModule);
  app.useGlobalPipes(new GqlValidationPipe());

  const configService = app.get(ConfigService);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [configService.getOrThrow<string>('RABBITMQ_URL')],
      queue: RabbitMQQueues.ACTIVITY,
      queueOptions: {
        durable: true,
      },
    },
  });
  await app.startAllMicroservices();

  const port = configService.get('POSTS_PORT');
  await app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/graphql`);
  });
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { GqlValidationPipe } from 'apps/common/src/pipe/graphql-validation.pipe';
import { PostsModule } from 'apps/posts/src/posts.module';

async function bootstrap() {
  const app = await NestFactory.create(PostsModule);
  app.useGlobalPipes(new GqlValidationPipe());
  await app.listen(3000);
}
bootstrap();

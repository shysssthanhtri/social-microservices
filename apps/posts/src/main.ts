import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { GqlValidationPipe } from 'apps/common/src/pipe/graphql-validation.pipe';
import { PostsModule } from 'apps/posts/src/posts.module';

async function bootstrap() {
  const app = await NestFactory.create(PostsModule);
  app.useGlobalPipes(new GqlValidationPipe());

  const configService = app.get(ConfigService);
  const port = configService.get('POSTS_PORT');
  await app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/graphql`);
  });
}
bootstrap();

import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { ActivitiesModule } from 'apps/activities/src/activities.module';

async function bootstrap() {
  const app = await NestFactory.create(ActivitiesModule);
  const configService = app.get(ConfigService);

  const port = configService.get('ACTIVITIES_PORT');
  await app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/graphql`);
  });
}
bootstrap();

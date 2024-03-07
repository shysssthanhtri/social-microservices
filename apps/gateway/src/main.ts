import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { GatewayModule } from 'apps/gateway/src/gateway.module';

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule);

  const configService = app.get(ConfigService);
  const port = configService.get('GATEWAY_PORT');
  await app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/graphql`);
  });
}
bootstrap();

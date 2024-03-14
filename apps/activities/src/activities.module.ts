import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ActivitiesService } from 'apps/activities/src/activities.service';
import { ActivityHandler } from 'apps/activities/src/events/handlers/activity.handler';

@Module({
  imports: [
    ConfigModule.forRoot(),
    RabbitMQModule.forRootAsync(RabbitMQModule, {
      useFactory: (configService: ConfigService) => ({
        exchanges: [
          {
            name: 'activities-exchange',
            type: 'topic',
          },
        ],
        uri: configService.getOrThrow<string>('RABBITMQ_URL'),
        channels: {
          'channel-1': {
            prefetchCount: 1,
            default: true,
          },
        },
      }),
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [ActivitiesService, ActivityHandler],
})
export class ActivitiesModule {}

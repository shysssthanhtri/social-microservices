import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ActivityHandler {
  @RabbitSubscribe({
    exchange: 'activities-exchange',
    routingKey: '#',
    queue: 'activities-service-queue',
  })
  async handle(data: any) {
    console.log({ data });
  }
}

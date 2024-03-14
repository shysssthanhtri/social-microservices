import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { AbstractEntityEvent } from '@shared/shared/events/entities/abstract-entity-event';

@Injectable()
export class ActivityHandler {
  @RabbitSubscribe({
    exchange: AbstractEntityEvent.exchange,
    routingKey: AbstractEntityEvent.routingKey,
    queue: 'activities-service-queue',
  })
  async handle(data: AbstractEntityEvent) {
    console.log({ entity: data.entity });
  }
}

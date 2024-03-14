import { AbstractEntity } from '@shared/shared/abstract/abstract-entity';

export abstract class AbstractEntityEvent<
  Entity extends AbstractEntity = AbstractEntity,
> {
  static exchange = 'activities-exchange';
  static routingKey = '#';

  constructor(public readonly entity: Entity) {}
}

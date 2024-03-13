import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { GraphQLModule } from '@nestjs/graphql';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { POSTS_SERVICE_PACKAGE_NAME } from '@shared/shared/__generated/proto/posts';
import { RabbitMQQueues } from '@shared/shared/rabbitmq/queues';
import { CreateUserHandler } from 'apps/users/src/commands/handlers/create-user.handler';
import { ClientModuleName } from 'apps/users/src/config/client-module';
import { User, UserSchema } from 'apps/users/src/entities/user.entity';
import { UserCreatedHandler } from 'apps/users/src/events/handlers/user-created.handler';
import { UsersResolver } from 'apps/users/src/graphql/users.resolver';
import { FindAllHandler } from 'apps/users/src/queries/handlers/find-all.handler';
import { FindOneHandler } from 'apps/users/src/queries/handlers/find-one.handler';
import { UsersService } from 'apps/users/src/services/users.service';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      autoSchemaFile: {
        federation: 2,
      },
    }),
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        return {
          uri: configService.get('USERS_MONGO_URL'),
        };
      },
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    CqrsModule,
    ClientsModule.registerAsync([
      {
        name: POSTS_SERVICE_PACKAGE_NAME,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            package: POSTS_SERVICE_PACKAGE_NAME,
            protoPath: join(__dirname, '..', 'proto/posts.proto'),
            url: `0.0.0.0:${configService.getOrThrow('POSTS_GRPC_PORT')}`,
          },
        }),
        imports: [ConfigModule],
        inject: [ConfigService],
      },
      {
        name: ClientModuleName.RMQ,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.getOrThrow<string>('RABBITMQ_URL')],
            queue: RabbitMQQueues.ACTIVITY,
            queueOptions: {
              durable: true,
            },
          },
        }),
        imports: [ConfigModule],
        inject: [ConfigService],
      },
    ]),
  ],
  providers: [
    UsersResolver,
    UsersService,
    CreateUserHandler,
    FindAllHandler,
    FindOneHandler,
    UserCreatedHandler,
  ],
})
export class UsersModule {}

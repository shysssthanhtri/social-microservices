import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { CreateUserHandler } from 'apps/users/src/commands/handlers/create-user.handler';
import { User, UserSchema } from 'apps/users/src/entities/user.entity';
import { UserCreatedHandler } from 'apps/users/src/events/handlers/user-created.handler';
import { UsersResolver } from 'apps/users/src/graphql/users.resolver';
import { FindAllHandler } from 'apps/users/src/queries/handlers/find-all.handler';
import { FindOneHandler } from 'apps/users/src/queries/handlers/find-one.handler';
import { UsersService } from 'apps/users/src/services/users.service';

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

import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { CreatePostHandler } from 'apps/posts/src/commands/handlers/create-post.handler';
import { Post, PostSchema } from 'apps/posts/src/entities/post.entity';
import { User, UserSchema } from 'apps/posts/src/entities/user.entity';
import { PostCreatedHandler } from 'apps/posts/src/events/handlers/post-created.handler';
import { UserCreatedHandler } from 'apps/posts/src/events/handlers/user-created.handler';
import { PostsResolver } from 'apps/posts/src/graphql/posts.resolver';
import { UsersResolver } from 'apps/posts/src/graphql/users.resolver';
import { FindAllHandler } from 'apps/posts/src/queries/handlers/find-all.handler';
import { FindByUserIdHandler } from 'apps/posts/src/queries/handlers/find-by-user-id.handler';
import { FindOneHandler } from 'apps/posts/src/queries/handlers/find-one.handler';
import { FindPostCountHandler } from 'apps/posts/src/queries/handlers/find-post-count.handler';
import { PostsService } from 'apps/posts/src/services/posts.service';

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
      buildSchemaOptions: {
        orphanedTypes: [User],
      },
    }),
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        return {
          uri: configService.get('POSTS_MONGO_URL'),
        };
      },
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([
      { name: Post.name, schema: PostSchema },
      { name: User.name, schema: UserSchema },
    ]),
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
    CqrsModule,
  ],
  providers: [
    PostsResolver,
    PostsService,
    UsersResolver,
    UserCreatedHandler,
    FindAllHandler,
    FindOneHandler,
    FindByUserIdHandler,
    FindPostCountHandler,
    CreatePostHandler,
    PostCreatedHandler,
  ],
  controllers: [],
})
export class PostsModule {}

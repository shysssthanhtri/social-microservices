import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsController } from 'apps/posts/src/controllers/posts.controller';
import { Post, PostSchema } from 'apps/posts/src/entities/post.entity';
import { User, UserSchema } from 'apps/posts/src/entities/user.entity';
import { PostsResolver } from 'apps/posts/src/graphql/posts.resolver';
import { UsersResolver } from 'apps/posts/src/graphql/users.resolver';
import { PostsService } from 'apps/posts/src/services/posts.service';
import { UsersService } from 'apps/posts/src/services/users.service';

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
  ],
  providers: [PostsResolver, PostsService, UsersResolver, UsersService],
  controllers: [PostsController],
})
export class PostsModule {}

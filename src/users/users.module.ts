import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CurrentUserMiddleware } from './middlewares/current-user.middleware';
import { NestModule } from '@nestjs/common';

@Module({
  imports : [TypeOrmModule.forFeature([User])],
  exports : [UsersService],
  controllers: [UsersController],
  // providers: [UsersService, AuthService,CurrentUserInterceptor]
  providers : [UsersService
    // {
    //   provide : APP_INTERCEPTOR,
    //   useClass : CurrentUserInterceptor
    // }
  ]

})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CurrentUserMiddleware)
      .forRoutes('*')
  }
}

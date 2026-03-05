import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AuthService } from './auth.service';
import { CurrentUserInterceptor } from 'src/interceptors/CurrentUserInterceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CurrentUserMiddleWare } from './middleware/current-user.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, AuthService, CurrentUserMiddleWare]
})
export class UsersModule implements NestModule {

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CurrentUserMiddleWare).forRoutes("*")
  }
}

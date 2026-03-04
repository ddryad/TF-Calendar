import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AuthService } from './auth.service';
import { CurrentUserInterceptor } from 'src/interceptors/CurrentUserInterceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  //providers: [UsersService, AuthService, CurrentUserInterceptor],
  providers: [UsersService, AuthService, 
    {
      provide : APP_INTERCEPTOR,
      useClass : CurrentUserInterceptor
    }
  ]
})
export class UsersModule {}

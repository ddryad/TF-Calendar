import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:
    [
      UsersModule,
      TypeOrmModule.forRoot({
        type: 'sqlite',
        database: 'db.sqlite',
        autoLoadEntities: true,
        synchronize: true
      })
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

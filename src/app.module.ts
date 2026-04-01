import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProgrammableModule } from './programmable/programmable.module';

@Module({
  imports:
    [
      UsersModule,
      TypeOrmModule.forRoot({
        type: 'sqlite',
        database: 'db.sqlite',
        autoLoadEntities: true,
        synchronize: true
      }),
      ProgrammableModule
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

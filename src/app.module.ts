import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
    type : 'sqlite',
    database : 'db.sqlite',
    autoLoadEntities : true,
    synchronize : true
  }),
    UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ProgrammableModule } from './programmable/programmable.module';
import { InvitationModule } from './invitation/invitation.module';
import { CalendrierModule } from './calendrier/calendrier.module';
import { OmnivoxModule } from './omnivox/omnivox.module';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports:
    [
      ConfigModule.forRoot({isGlobal: true}), //env accessible everywhere
      UsersModule,
      TypeOrmModule.forRoot({
        type: 'sqlite',
        database: 'db.sqlite',
        autoLoadEntities: true,
        synchronize: true
      }),
      ProgrammableModule,
      InvitationModule,
      AuthModule,
      CalendrierModule,
      OmnivoxModule
    ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule { }

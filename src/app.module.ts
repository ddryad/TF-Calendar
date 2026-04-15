import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ProgrammableModule } from './programmable/programmable.module';
import { InvitationModule } from './invitation/invitation.module';
import { OmnivoxModule } from './omnivox/omnivox.module';

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
      ProgrammableModule,
      InvitationModule,
      UsersModule,
      AuthModule,
      OmnivoxModule
    ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule { }

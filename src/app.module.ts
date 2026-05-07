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
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports:
    [
      ConfigModule.forRoot({ isGlobal: true }),

      TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
          type: 'mysql',
          host: configService.get('HOST'),
          port: +configService.get('PORT'),
          username: configService.get('DB_USER'),
          password: configService.get('PASSWORD'),
          database: configService.get('DATABASE'),
          entities: [],
          autoLoadEntities : true,
          synchronize: true,
        }),
        inject: [ConfigService],
      }),
      UsersModule,
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

import { Module, forwardRef } from '@nestjs/common';
import { InvitationService } from './invitation.service';
import { InvitationController } from './invitation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invitation } from './invitation.entity';
import { ProgrammableModule } from '../programmable/programmable.module';
import { InvitationFactory } from './factory/invitation.factory';
@Module({
  imports: [
    TypeOrmModule.forFeature([Invitation]),
    forwardRef(() => ProgrammableModule),
  ],
  providers: [InvitationService],
  controllers: [InvitationController],
  exports: [InvitationService]
  imports: [TypeOrmModule.forFeature([Invitation])],
  providers: [InvitationService, InvitationFactory],
  controllers: [InvitationController]
})
export class InvitationModule {}

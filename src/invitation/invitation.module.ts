import { Module } from '@nestjs/common';
import { InvitationService } from './invitation.service';
import { InvitationController } from './invitation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invitation } from './invitation.entity';
import { InvitationFactory } from './factory/invitation.factory';
@Module({
  imports: [TypeOrmModule.forFeature([Invitation])],
  providers: [InvitationService, InvitationFactory],
  controllers: [InvitationController]
})
export class InvitationModule {}

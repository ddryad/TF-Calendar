import { Module, forwardRef } from '@nestjs/common';
import { InvitationService } from './invitation.service';
import { InvitationController } from './invitation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invitation } from './invitation.entity';
import { ProgrammableModule } from '../programmable/programmable.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([Invitation]),
    forwardRef(() => ProgrammableModule),
  ],
  providers: [InvitationService],
  controllers: [InvitationController],
  exports: [InvitationService]
})
export class InvitationModule {}

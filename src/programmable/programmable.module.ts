import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProgrammableController } from './programmable.controller';
import { ProgrammableService } from './programmable.service';
import { Programmable } from './entities/programmable.entity';
import { Evenement } from './entities/evenement.entity';
import { Activite } from './entities/activite.entity';
import { ActiviteGroupe } from './entities/activite-groupe.entity';
import { User } from '../users/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Programmable,
      Evenement,
      Activite,
      ActiviteGroupe,
      User,
    ]),
  ],
  controllers: [ProgrammableController],
  providers: [ProgrammableService],
  exports:[ProgrammableService]
})
export class ProgrammableModule {}

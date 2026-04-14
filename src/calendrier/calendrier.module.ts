import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Calendrier } from './calendrier.entity';
import { CalendrierService } from './calendrier.service';
import { CalendrierController } from './calendrier.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Calendrier])],
    controllers: [CalendrierController],
    providers: [CalendrierService],
})
export class CalendrierModule {}

import { Module } from '@nestjs/common';
import { CalendrierService } from './calendrier.service';

@Module({
  providers: [CalendrierService],
})
export class CalendrierModule {}

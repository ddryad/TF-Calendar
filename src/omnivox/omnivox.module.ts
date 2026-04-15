import { Module } from '@nestjs/common';
import { OmnivoxController } from './omnivox.controller';
import { OmnivoxService } from './omnivox.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports:[HttpModule],
  controllers: [OmnivoxController],
  providers: [OmnivoxService]
})
export class OmnivoxModule {}

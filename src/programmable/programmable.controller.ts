import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProgrammableService } from './programmable.service';
import { CreateEvenementDto } from './dtos/create-evenement.dto';
import { CreateActiviteDto } from './dtos/create-activite.dto';

@Controller('programmable')
export class ProgrammableController {
  constructor(private readonly programmableService: ProgrammableService) {}

  @Get()
  findAll() {
    return this.programmableService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.programmableService.findOne(id);
  }

  @Post('evenement')
  createEvenement(@Body() createDto: CreateEvenementDto) {
    return this.programmableService.createEvenement(createDto);
  }

  @Post('activite')
  createActivite(@Body() createDto: CreateActiviteDto) {
    return this.programmableService.createActivite(createDto);
  }
}

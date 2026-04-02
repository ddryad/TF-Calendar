import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ProgrammableService } from './programmable.service';
import { CreateEvenementDto } from './dtos/create-evenement.dto';
import { CreateActiviteDto } from './dtos/create-activite.dto';
import { AuthGuard } from 'src/guards/auth.guard';

@UseGuards(AuthGuard)
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

  @Patch('activite/:id')
  updateActivite(@Body() activite: CreateActiviteDto, @Param("id") id : string){
    return this.programmableService.updateActivite(id, activite);
  }

  @Patch('evenement/:id')
  updateEvenement(@Body() evenement: CreateEvenementDto, @Param("id") id : string){
    return this.programmableService.updateEvenement(id, evenement);
  }

  @Delete(':id')
  deleteProgrammable(@Param("id") id : string){
    return this.programmableService.deleteProgrammable(id)
  }
}

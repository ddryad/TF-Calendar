// on remarque ici que j'utilise des dtos + currentuser sur certaines routes
// pour empêcher d'usurper l'identite d'un utilisateur
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { ProgrammableService } from './programmable.service';
import { CreateEvenementDto } from './dtos/create-evenement.dto';
import { CreateActiviteDto } from './dtos/create-activite.dto';
import { CreateActiviteGroupeDto } from './dtos/create-activite-groupe.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/user.entity';

@UseGuards(AuthGuard)
@Controller('programmable')
export class ProgrammableController {
  constructor(private readonly programmableService: ProgrammableService) { }

  @Get()
  findAll() {
    return this.programmableService.findAll();
  }

  @Get('user/:userId')
  findAllByUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.programmableService.findAllByUser(userId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.programmableService.findOne(id);
  }

  @Post('evenement')
  createEvenement(@CurrentUser() user: User, @Body() createDto: CreateEvenementDto) {
    return this.programmableService.createEvenement(createDto, user.id, user.calendrierId);
  }

  @Post('activite')
  createActivite(@CurrentUser() user: User, @Body() createDto: CreateActiviteDto) {
    return this.programmableService.createActivite(createDto, user.id, user.calendrierId);
  }

  @Post('activite-groupe')
  createActiviteGroupe(@CurrentUser() user: User, @Body() createDto: CreateActiviteGroupeDto) {
    return this.programmableService.createActiviteGroupe(createDto, user.id, user.calendrierId);
  }

  @Patch('activite-groupe/:id')
  updateActiviteGroupe(@Param('id', ParseIntPipe) id: number, @Body() updateDto: CreateActiviteGroupeDto) {
    return this.programmableService.updateActiviteGroupe(id, updateDto);
  }

  @Patch('activite/:id')
  updateActivite(@Param('id', ParseIntPipe) id: number, @Body() activite: CreateActiviteDto) {
    return this.programmableService.updateActivite(id, activite);
  }

  @Patch('evenement/:id')
  updateEvenement(@Param('id', ParseIntPipe) id: number, @Body() evenement: CreateEvenementDto) {
    return this.programmableService.updateEvenement(id, evenement);
  }

  @Delete(':id')
  deleteProgrammable(@Param('id', ParseIntPipe) id: number) {
    return this.programmableService.deleteProgrammable(id);
  }
}

import { Body, Controller, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { CalendrierService } from './calendrier.service';
import { CreateCalendrierDto } from './dtos/create-calendrier.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/user.entity';

@UseGuards(AuthGuard)
@Controller('calendrier')
export class CalendrierController {

    constructor(private readonly calendrierService: CalendrierService) { }

    @Post()
    create(@CurrentUser() user: User, @Body() dto: CreateCalendrierDto) {
        return this.calendrierService.create(dto, user.id);
    }

    @Get('me')
    getMyCalendrier(@CurrentUser() user: User) {
        return this.calendrierService.findByUser(user.id);
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.calendrierService.findOne(id);
    }
}

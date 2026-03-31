import { Controller, Get, Post, Patch, Param, Body, ParseIntPipe } from '@nestjs/common';
import { InvitationService } from './invitation.service';
import { CreateInvitationDto } from './dtos/create-invitation.dto';
import { UpdateInvitationDto } from './dtos/update-invitation.dto';
import { Invitation } from './invitation.entity';



@Controller('invitation')// /invitation
export class InvitationController {
    /*
    GET /invitation
    GET /invitation/:id
    POST /invitation
    PATCH /invitation/:id/accept
    PATCH /invitation/:id/refuse

    */
   constructor(private readonly invitationService: InvitationService){}


   @Get() // recupère toutes les invitations
   findAll(){
    return this.invitationService.findAll();
   }
   @Get(':id') // recupère une invitation par son id 
   findOne(@Param('id', ParseIntPipe) id: number){
    return this.invitationService.findOne(id);
   }

   @Post() // crée une invitation 
   create(@Body() invitation: CreateInvitationDto){
    return this.invitationService.createInvitation(invitation);
   }

   @Patch(':id/accept') // accepte l'invitation
   accept(@Param('id', ParseIntPipe) id: number ){
    return this.invitationService.acceptInvitation(id);
   }
 
   @Patch(':id/refuse') // refuse l'invitation 
   refuse(@Param('id', ParseIntPipe) id: number){
    return this.invitationService.refuseInvitation(id);
   }


}

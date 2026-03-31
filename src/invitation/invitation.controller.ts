import { Controller, Get, Post, Patch, Param } from '@nestjs/common';
import { InvitationService } from './invitation.service';
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


   @Get()
   findAll(){
    //return this.invitationService.findAll();
   }
   @Get(':id')
   findOne(@Param('id') id: string){
    //return this.invitationService.findOne(id);
   }


}

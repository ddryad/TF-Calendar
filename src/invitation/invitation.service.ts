import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Invitation } from './invitation.entity';
import { CreateInvitationDto } from './dtos/create-invitation.dto';
import { UpdateInvitationDto } from './dtos/update-invitation.dto';
import { InvitationStatut } from './enums/invitation-statut.enum';
import { InvitationFactory } from "./factory/invitation.factory";

@Injectable()
export class InvitationService {
    constructor(
    @InjectRepository(Invitation)
    private invitationRepository: Repository<Invitation>,
    private invitationFactory: InvitationFactory
    ){}

    async findAll(){
        return await this.invitationRepository.find()
    }

    async findOne(id: number){
        const invitation = await this.invitationRepository.findOne({where:{id}})
        if(!invitation){
            throw new NotFoundException(`Invitation avec l'id ${id} est inexistante`)
        }
        return invitation
    }

    async getMyInvitations(userId: number) {
        return this.invitationRepository.find({
          where: { invitedUserId: userId }
        });
      }

      async getSentInvitations(userId: number) {
        return this.invitationRepository.find({
          where: { senderId: userId }
        });
      }

    async createInvitation(invitationDto: CreateInvitationDto){
        
        const specificFactory = this.invitationFactory.create(invitationDto.type);
    
        const baseData = specificFactory.create(invitationDto);
    
        const invitation = this.invitationRepository.create({
            ...baseData,
            statut: InvitationStatut.PENDING,
            sentAt: new Date(),
        });
    
        return this.invitationRepository.save(invitation);
    }

    async acceptInvitation(id: number, userId: number){
        const invitation  = await this.findOne(id)

        if (invitation.invitedUserId !== userId){
            throw new ForbiddenException("Vous ne pouvez pas accepter cette invitation");
        }

        invitation.statut = InvitationStatut.ACCEPTED;
        return this.invitationRepository.save(invitation);
    }

    async refuseInvitation(id: number, userId: number){
        const invitation  = await this.findOne(id)

        if (invitation.invitedUserId !== userId){
            throw new ForbiddenException("Vous ne pouvez pas accepter cette invitation");
        }

        invitation.statut = InvitationStatut.REFUSED;
        return this.invitationRepository.save(invitation);
    }

    async remove(id: number) {
        const invitation = await this.findOne(id);
        return this.invitationRepository.remove(invitation);
      }

    



}

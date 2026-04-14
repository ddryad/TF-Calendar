import { IsEnum, IsNumber, IsNotEmpty, IsDate, IsString } from "class-validator";
import { InvitationStatut } from "../enums/invitation-statut.enum";

export class CreateInvitationDto{

    @IsNumber()
    @IsNotEmpty()
    senderId: number;

    @IsNumber()
    @IsNotEmpty()
    invitedUserId: number;

    @IsString()
    @IsNotEmpty()
    type: string;

}
import { IsEnum, isString, IsNotEmpty, IsDate, IsString } from "class-validator";
import { InvitationStatut } from "../enums/invitation-statut.enum";

export class CreateInvitationDto{

    @IsString()
    @IsNotEmpty()
    senderId: number;

    @IsString()
    @IsNotEmpty()
    invitedUserId: number;

    @IsString()
    @IsNotEmpty()
    type: string;

}
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { InvitationStatut } from "./enums/invitation-statut.enum";
@Entity()
export class Invitation{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    senderId: number;

    @Column()
    invitedUserId: number;

    @Column({type: 'text', enum: InvitationStatut}) //TypeORM voit un Objet donc on précise le type dans @Column
    statut: InvitationStatut;

    @Column()
    sentAt: Date;

    @Column() // permet de différencier le type de l'invitation soit InvitationAmi soit InvitationActivite
    type: string;
}
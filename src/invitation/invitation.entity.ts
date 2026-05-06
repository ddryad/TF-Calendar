import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "src/users/user.entity";
import { InvitationStatut } from "./enums/invitation-statut.enum";
@Entity()
export class Invitation {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    senderId: number;

    @Column()
    invitedUserId: number;

    @ManyToOne(() => User)
    @JoinColumn({name: "senderId"})
    sender: User;

    @ManyToOne(() => User)
    @JoinColumn({name: "invitedUserId"})
    invitedUser: User;

    @Column({ type: 'text', enum: InvitationStatut }) //TypeORM voit un Objet donc on précise le type dans @Column
    statut: InvitationStatut;

    @Column()
    sentAt: Date;

    @Column() // permet de différencier le type de l'invitation soit InvitationAmi soit InvitationActivite
    type: string;

    @Column({ nullable: true }) // Renseigné uniquement si type === 'ACTIVITE'
    activiteGroupeId: number;

    @Column({nullable : true})
    activiteId?: number;

    @Column({nullable : true})
    amiId?: number;
}
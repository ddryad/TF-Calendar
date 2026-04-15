import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Evenement } from '../programmable/entities/evenement.entity';
import { Activite } from '../programmable/entities/activite.entity';

@Entity()
export class Calendrier {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nom: string;

    @Column()
    ownerId: number;

    @OneToMany(() => Evenement, (e) => e.calendrier, { cascade: true, eager: false })
    evenements: Evenement[];

    @OneToMany(() => Activite, (a) => a.calendrier, { cascade: true, eager: false })
    activites: Activite[];
}

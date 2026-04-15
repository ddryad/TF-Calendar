import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Calendrier {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nom: string;

    @Column()
    ownerId: number;

    @OneToMany('Evenement', 'calendrier', { cascade: true, eager: false })
    evenements: any[];

    @OneToMany('Activite', 'calendrier', { cascade: true, eager: false })
    activites: any[];
}